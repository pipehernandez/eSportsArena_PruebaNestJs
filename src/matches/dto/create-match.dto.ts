import { IsString } from "class-validator";

export class CreateMatchDto {
    @IsString()
    player1Id: string;
}
