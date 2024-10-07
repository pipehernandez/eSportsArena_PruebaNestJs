import { Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { User } from 'src/users/entities/user.entity';
import { Match } from 'src/matches/entities/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, User, Match])],
  controllers: [TournamentsController],
  providers: [TournamentsService],
})
export class TournamentsModule {}
