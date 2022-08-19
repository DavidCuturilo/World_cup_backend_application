import { WorldCupService } from './world-cup.service';
import { Module } from '@nestjs/common';
import { WorldCupController } from './world-cup.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [WorldCupController],
  providers: [WorldCupService],
})
export class WorldCupModule {}
