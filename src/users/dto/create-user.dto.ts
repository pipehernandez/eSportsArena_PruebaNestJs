import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto {
    @IsOptional()
    @IsString()
    nickName?: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsOptional()
    age?: number;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8, {message: 'Password must have at least 8 characters'})
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}
