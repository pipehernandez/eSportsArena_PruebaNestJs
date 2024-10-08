import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @ApiOperation({summary: 'User login'})
    @ApiResponse({status: 200, description: 'Successful login'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @Post('login')
    login(@Body()LoginDto: LoginDto) {
        return this.authService.login(LoginDto);
    }

}