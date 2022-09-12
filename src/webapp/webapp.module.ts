import { HelpersService } from './../helpers/helpers.service';
import { Prediction } from './../entities/prediction.entity';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WebappController } from './webapp.controller';
import { WebappService } from './webapp.service';
import { Match } from 'src/entities/match.entity';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    TypeOrmModule.forFeature([User, Prediction, Match]),
  ],
  controllers: [WebappController],
  providers: [WebappService, HelpersService],
})
export class WebappModule {}
