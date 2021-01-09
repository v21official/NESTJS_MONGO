import { BadRequestException, Body, Controller, Get, NotFoundException, Post, Request, SetMetadata, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto, ChangePasswordDto } from './users.dto';

export const Public = () => SetMetadata("isPublic", true);

@Controller('users')
// @UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Public()
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.register(createUserDto);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Post('changePassword')
    async changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
        // try {
        return await this.usersService.changePassword(req.user, changePasswordDto);
        // } catch (error) {
        //     throw new BadRequestException(error.message || error.toString());
        // }
    }
}
