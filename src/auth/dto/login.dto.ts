import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {
    @ApiProperty({example: 'user@example.com', description: 'User email'})
    @IsEmail()
    email:string;
    
    @ApiProperty({ example: 'strongPassword123', description: 'User password' })
    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(8)
    password:string;
}