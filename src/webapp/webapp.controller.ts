import { SavePredictionRequestDto } from './dto/save-prediction.request.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { WebappService } from './webapp.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
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

  @Post('savePrediction')
  async savePredictionForUser(
    @Body() savePrediction: SavePredictionRequestDto,
  ) {
    return this.webappService.savePrediction(savePrediction);
  }

  @Get('allPredictions/:id')
  async getAllPredictions(@Param('id') id: number) {
    return this.webappService.getAllPredictions(id);
  }

  @Get('prediction')
  async getPrediction(@Query() query: { user_id: number; match_id: string }) {
    return this.webappService.getPrediction(query.user_id, query.match_id);
  }
}
