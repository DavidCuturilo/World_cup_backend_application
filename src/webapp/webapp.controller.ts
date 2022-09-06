import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { WebappService } from './webapp.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Webapp routes')
@UseInterceptors(TransformInterceptor)
@Controller('webapp')
@UseGuards(JwtAuthGuard)
export class WebappController {
  constructor(private readonly webappService: WebappService) {}

  @Get('users')
  async getScoreboard() {
    return await this.webappService.getScoreboard();
  }

  @Post('savePredictions')
  async savePredictionsForUser(@Body() savePredictionsForUser: any) {
    this.webappService.savePredictionsForUser(savePredictionsForUser);
  }

  @Get('allPredictionsForUser/:id')
  async getAllPredictionsForUser(@Param('id') id: number) {
    this.webappService.getAllPredictionsForUser(id);
  }
}
