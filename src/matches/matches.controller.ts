import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Matches')
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) { }

  @ApiOperation({ summary: 'Match results' })
  @ApiResponse({
    status: 201,
    description: 'The match result was successfully registered',
    content: {
      'aplication/json': {
        example: {
          "id": 2,
          "scorePlayer1": 15,
          "scorePlayer2": 4,
          "result": "Player1_WIN"
        },
      },
    },
  })
  @ApiResponse({status: 400, description: 'Invalid input data'})
  @ApiResponse({status: 404, description: 'Match not found'})
  @ApiParam({ name: 'matchId', type: 'number', description: 'Id of the match'})
  @ApiBody({
    description: 'Scores of both players',
    schema: {
      type: 'object',
      properties: {
        player1Score: { type: 'number', example: 3, description: 'Score of player 1' },
        player2Score: { type: 'number', example: 2, description: 'Score of player 2' },
      },
    },
  })
  @Post(':matchId/result')
  registerMatchResult(@Param('matchId') matchId: number, @Body('player1Score') player1Score: number, @Body('player2Score') player2Score: number,) {
    return this.matchesService.registerMatchResult(matchId, player1Score, player2Score);
  }

}
