import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateTournamentDto {
    @ApiProperty({
        description: 'The name of the tournament',
        example: 'Spring Championship',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Description of the tournament',
        example: 'An annual spring tournament for regional teams.',
    })
    @IsString()
    @IsNotEmpty({ message: 'Please enter a description' })
    description: string;

    @ApiProperty({
        description: 'The starting date of the tournament',
        example: '2024-05-10',
        type: String,
        format: 'date',
    })
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty({
        description: 'The ending date of the tournament',
        example: '2024-05-20',
        type: String,
        format: 'date',
    })
    @IsNotEmpty()
    endDate: Date;

    @ApiProperty({
        description: 'The current status of the tournament',
        example: 'upcoming',
    })
    @IsString()
    @IsNotEmpty()
    status: string;
}
