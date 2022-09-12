import { Prediction } from './../../entities/prediction.entity';
import { NationalTeam } from './../../entities/national-team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorldCupService } from './world-cup.service';
import { Module } from '@nestjs/common';
import { WorldCupController } from './world-cup.controller';
import { HttpModule } from '@nestjs/axios';
import { Match } from 'src/entities/match.entity';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    TypeOrmModule.forFeature([NationalTeam, Match, Prediction]),
  ],
  controllers: [WorldCupController],
  providers: [WorldCupService],
})
export class WorldCupModule {}
