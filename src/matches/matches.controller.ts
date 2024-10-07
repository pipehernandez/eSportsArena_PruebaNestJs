import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MatchesService } from './matches.service';


@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) { }

  @Post(':matchId/result')
  registerMatchResult(@Param('matchId') matchId: number, @Body('player1Score') player1Score: number, @Body('player2Score') player2Score: number,) {
    return this.matchesService.registerMatchResult(matchId, player1Score, player2Score);
  }

}
