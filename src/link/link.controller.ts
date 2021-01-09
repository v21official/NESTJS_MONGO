import { BadRequestException, Body, Controller, Get, Ip, Param, Post, Query, Redirect, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LinkService } from './link.service';
import { CreateLinkDto } from './link.dto';

@Controller('link')
// @UseGuards(JwtAuthGuard)
export class LinkController {
    constructor(private readonly linkService: LinkService) { }

    @Post('create')
    async create(@Request() req, @Body() createLinkDto: CreateLinkDto) {
        return await this.linkService.create(req, createLinkDto);
    }

    @Get('getMyLinks')
    async getMyLinks(@Request() req) {
        return await this.linkService.findAllByUsername(req.user.username);
    }

    @Post('delete')
    async delete(@Request() req, @Body('alias') alias: string) {
        return await this.linkService.delete(req, alias);
    }

    @Get('accessCountLinkByAlias')
    async accessCountLinkByAlias(@Query('alias') alias: string) {
        return await this.linkService.accessCountLinkByAlias(alias);
    }
}

