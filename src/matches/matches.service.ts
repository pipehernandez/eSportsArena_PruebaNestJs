import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
  ) { }

  async registerMatchResult(matchId: number, player1Score: number, player2Score: number,): Promise<any> {
    try {
      const match = await this.matchRepository.findOne({
        where: { id: matchId },
      });
      if (!match) {
        throw new BadRequestException(`Match with id ${matchId} not found.`);
      }
      match.scorePlayer1 = player1Score;
      match.scorePlayer2 = player2Score;
      if (player1Score > player2Score) {
        match.result = 'Player1_WIN';
      } else if (player1Score < player2Score) {
        match.result = 'Player2_WIN';
      } else {
        match.result = 'DRAW';
      }
      await this.matchRepository.save(match);
      return match;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed registering match result. ' + error.message,
      );
    }
  }

  async getMatches(): Promise<Match[]>{
    try {
      return await this.matchRepository.find({ relations: ['player1', 'player2', 'tournament'] });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed getting matches. ' + error.message,
      );
    }
  }
}
