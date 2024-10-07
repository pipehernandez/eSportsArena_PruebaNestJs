import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>){}

  async create(createTournamentDto: CreateTournamentDto): Promise<Tournament> {
    try {
      const newTournament = await this.tournamentRepository.create(createTournamentDto);
      await this.tournamentRepository.save(newTournament);
      return newTournament;
    } catch (error) {
      throw new InternalServerErrorException('Falied creating tournament. '+ error.message)
    }
  }

  findAll() {
    return `This action returns all tournaments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tournament`;
  }

  update(id: number, updateTournamentDto: UpdateTournamentDto) {
    return `This action updates a #${id} tournament`;
  }

  remove(id: number) {
    return `This action removes a #${id} tournament`;
  }
}
