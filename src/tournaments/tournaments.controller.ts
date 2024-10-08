import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { Tournament } from './entities/tournament.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService){}

  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async create(@Body() createTournamentDto: CreateTournamentDto): Promise<Tournament> {
    return await this.tournamentsService.create(createTournamentDto);
  }

  @Get()
  async findAll(): Promise<Tournament[]> {
    return await this.tournamentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Tournament> {
    return await this.tournamentsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTournamentDto: UpdateTournamentDto): Promise<Tournament> {
    return await this.tournamentsService.update(id, updateTournamentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<string> {
    return await this.tournamentsService.remove(id);
  }

  @Post(':tournamentId/pairings')
  async generatePairings(@Param('tournamentId') tournamentId: number): Promise<any>{
    return await this.tournamentsService.generatePairings(tournamentId);
  }
}
