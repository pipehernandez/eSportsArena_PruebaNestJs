import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, IsNumber, IsEmail, IsStrongPassword, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiPropertyOptional({ description: 'Optional nickname for the user' })
    @IsOptional()
    @IsString()
    nickName?: string;

    @ApiPropertyOptional({ description: 'Full name of the user' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ description: 'Age of the user' })
    @IsOptional()
    @IsNumber()
    age?: number;

    @ApiPropertyOptional({ description: 'Email address of the user' })
    @IsOptional()
    @IsString()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({ description: 'User password, must be at least 8 characters and strong' })
    @IsOptional()
    @IsString()
    @MinLength(8, { message: 'Password must have at least 8 characters' })
    @IsStrongPassword()
    password?: string;
}
