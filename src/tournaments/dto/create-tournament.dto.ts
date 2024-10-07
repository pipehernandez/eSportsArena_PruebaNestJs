import { IsNotEmpty, IsString } from "class-validator";

export class CreateTournamentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty({message: 'Please enter a description'})
    description: string;

    @IsNotEmpty()
    startDate: Date;

    @IsNotEmpty()
    endDate: Date;

    @IsString()
    @IsNotEmpty()
    status: string;
}
