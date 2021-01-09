import { BadRequestException, Ip, SetMetadata } from '@nestjs/common';
import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { LinkService } from './link/link.service';

export const Public = () => SetMetadata("isPublic", true);

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly linkService: LinkService
  ) { }

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get(':alias')
  @Redirect()
  async getAlias(@Param('alias') alias: string, @Ip() ip: any) {
    const redirectLink = await this.linkService.redirect(alias, ip);
    return {
      "url": redirectLink,
      "statusCode": 307
    }
  }
}
