import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { Tournament } from './entities/tournament.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Tournaments')
@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService){}

  @ApiOperation({ summary: 'Create a new tournament' })
  @ApiResponse({ status: 201, description: 'Tournament created successfully.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('create')
  async create(@Body() createTournamentDto: CreateTournamentDto): Promise<Tournament> {
    return await this.tournamentsService.create(createTournamentDto);
  }

  @ApiOperation({ summary: 'Get all tournaments' })
  @ApiResponse({ status: 200, description: 'List of tournaments.' })
  @Get()
  async findAll(): Promise<Tournament[]> {
    return await this.tournamentsService.findAll();
  }

  @ApiOperation({ summary: 'Get a single tournament by ID' })
  @ApiResponse({ status: 200, description: 'Tournament details.' })
  @ApiResponse({ status: 404, description: 'Tournament not found.' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Tournament> {
    return await this.tournamentsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a tournament by ID' })
  @ApiResponse({ status: 200, description: 'Tournament updated successfully.' })
  @ApiResponse({ status: 404, description: 'Tournament not found.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTournamentDto: UpdateTournamentDto): Promise<Tournament> {
    return await this.tournamentsService.update(id, updateTournamentDto);
  }

  @ApiOperation({ summary: 'Delete a tournament by ID' })
  @ApiResponse({ status: 200, description: 'Tournament deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Tournament not found.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<string> {
    return await this.tournamentsService.remove(id);
  }

  @ApiOperation({ summary: 'Generate pairings for a tournament' })
  @ApiResponse({ status: 200, description: 'Pairings generated successfully.' })
  @ApiResponse({ status: 404, description: 'Tournament not found.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post(':tournamentId/pairings')
  async generatePairings(@Param('tournamentId') tournamentId: number): Promise<any>{
    return await this.tournamentsService.generatePairings(tournamentId);
  }
}
