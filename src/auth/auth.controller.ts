import { BadRequestException, Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    // @Post('register')
    // async register(@Body() body) {
    //     try {
    //         return await this.authService.register(body);
    //     } catch (error) {
    //         throw new BadRequestException(error.message || error.toString());
    //     }
    // }

    // @UseGuards(JwtAuthGuard)
    // @Get('profile')
    // getProfile(@Request() req) {
    //     return req.user;
    // }

    // @UseGuards(JwtAuthGuard)
    // @Post('changePassword')
    // async changePassword(@Request() req, @Body() body) {
    //     try {
    //         return await this.authService.changePassword({ user: req.user, body });
    //     } catch (error) {
    //         throw new BadRequestException(error.message || error.toString());
    //     }
    // }
}
