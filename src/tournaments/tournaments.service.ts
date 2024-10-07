import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Match } from 'src/matches/entities/match.entity';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
  ) { }

  async create(createTournamentDto: CreateTournamentDto): Promise<Tournament> {
    try {
      const { name } = createTournamentDto;
      const existingTournament = await this.tournamentRepository.findOne({where: {name}})
      if (existingTournament) {
        throw new BadRequestException(`Tournament with name ${name} already exists.`);
      }
      const newTournament = this.tournamentRepository.create(createTournamentDto);
      await this.tournamentRepository.save(newTournament);
      return newTournament;
    } catch (error) {
      throw new InternalServerErrorException('Falied creating tournament. ' + error.message)
    }
  }

  async findAll(): Promise<Tournament[]> {
    try {
      return await this.tournamentRepository.find({ relations: ['matches'] });
    } catch (error) {
      throw new InternalServerErrorException('Falied finding tournaments. ' + error.message)
    }
  }

  async findOne(id: number): Promise<Tournament> {
    try {
      const tournament = await this.tournamentRepository.findOne({
        where: { id },
        relations: ['matches']
      });
      if (!tournament) {
        throw new BadRequestException(`Tournament with id ${id} not found.`);
      }
      return tournament;
    } catch (error) {
      throw new InternalServerErrorException('Falied finding tournament. ' + error.message)
    }
  }

  async update(id: number, updateTournamentDto: UpdateTournamentDto): Promise<Tournament> {
    try {
      const tournament = await this.tournamentRepository.findOne({ where: { id } });
      if (!tournament) {
        throw new BadRequestException(`Tournament with id ${id} not found.`);
      }
      Object.assign(tournament, updateTournamentDto);
      await this.tournamentRepository.save(tournament);
      return tournament;
    } catch (error) {
      throw new InternalServerErrorException('Falied updating tournament. ' + error.message)
    }
  }

  async remove(id: number): Promise<string> {
    try {
      const tournament = await this.tournamentRepository.findOne({ where: { id } });
      if (!tournament) {
        throw new BadRequestException(`Tournament with id ${id} not found.`);
      }
      await this.tournamentRepository.delete(id);
      return `Tournament with id ${id} has been deleted.`;
    } catch (error) {
      throw new InternalServerErrorException('Falied deleting tournament. ' + error.message)
    }
  }

  async generatePairings(tournamentId: number): Promise<any> {
    try {
      const tournament = await this.tournamentRepository.findOne({
        where: { id: tournamentId },
        relations: ['matches']
      });
      if (!tournament) {
        throw new BadRequestException(`Tournament with id ${tournamentId} not found.`);
      }
      const players = await this.userRepository.find()
      if (players.length < 4) {
        throw new BadRequestException('Not enough players to generate pairings.');
      }

      for (let i = players.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [players[i], players[j]] = [players[j], players[i]];
      }

      const matches = [];
      for (let i = 0; i < players.length; i += 2) {
        if (players[i + 1]) {
          const match = this.matchRepository.create({
            tournament,
            player1: players[i],
            player2: players[i + 1],
          });
          matches.push(match);
        }
      }

      return this.matchRepository.save(matches);
    } catch (error) {
      throw new InternalServerErrorException('Falied generating pairings. ' + error.message)
    }
  }
}
