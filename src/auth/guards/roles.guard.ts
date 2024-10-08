import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/common/enums/role.enum';
import { JwtAuthGuard } from './jwt.guard';

@Injectable()
export class RolesGuard extends JwtAuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        jwtService: JwtService,
        configService: ConfigService
    ) {
        super(jwtService, configService);
    }

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const isAuthenticated = await super.canActivate(context);
        if (!isAuthenticated) {
            return false;
        }
        
        const roles = this.reflector.get<Role[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user || !roles.includes(user.role)) {
            throw new ForbiddenException('You do not have permission to access this resource');
        }
        return true;
    }
}