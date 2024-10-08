import { PartialType } from '@nestjs/mapped-types';
import { CreateTournamentDto } from './create-tournament.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTournamentDto extends PartialType(CreateTournamentDto) {
    @ApiPropertyOptional({
        description: 'The name of the tournament',
        example: 'Spring Championship',
    })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({
        description: 'Description of the tournament',
        example: 'An annual spring tournament for regional teams.',
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({
        description: 'The starting date of the tournament',
        example: '2024-05-10',
        type: String,
        format: 'date',
    })
    @IsOptional()
    startDate?: Date;

    @ApiPropertyOptional({
        description: 'The ending date of the tournament',
        example: '2024-05-20',
        type: String,
        format: 'date',
    })
    @IsOptional()
    endDate?: Date;

    @ApiPropertyOptional({
        description: 'The current status of the tournament',
        example: 'upcoming',
    })
    @IsString()
    @IsOptional()
    status?: string;
}
