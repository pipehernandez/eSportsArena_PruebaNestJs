import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MinLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiPropertyOptional({ description: 'Optional nickname for the user' })
    @IsOptional()
    @IsString()
    nickName?: string;

    @ApiProperty({ description: 'Name of the user' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({ description: 'Age of the user' })
    @IsNumber()
    @IsOptional()
    age?: number;

    @ApiProperty({ description: 'Email address of the user' })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'User password, must be at least 8 characters and strong' })
    @IsString()
    @MinLength(8, {message: 'Password must have at least 8 characters'})
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}
