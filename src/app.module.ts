import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LinkModule } from './link/link.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin98x:password98x@103.57.222.100:27017/short_link'),
    UsersModule,
    AuthModule,
    LinkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
