import { PartialType } from '@nestjs/mapped-types';
import { CreateTournamentDto } from './create-tournament.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTournamentDto extends PartialType(CreateTournamentDto) {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsOptional()
    startDate?: Date;

    @IsOptional()
    endDate?: Date;

    @IsString()
    @IsOptional()
    status?: string;
}
