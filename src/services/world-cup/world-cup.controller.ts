import {
  SwaggerStandingsResponseDto,
  SwaggerMatchesByRoundResponseDto,
} from './../../interceptors/dto/internal-response-model.dto';
import { WorldCupService } from './world-cup.service';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('World cup routes')
@Controller('world-cup')
export class WorldCupController {
  constructor(private readonly worldCupService: WorldCupService) {}

  @ApiResponse({ status: 200, type: SwaggerStandingsResponseDto })
  @Get('standings')
  async getStandings() {
    return await this.worldCupService.getStandings();
  }

  @ApiResponse({ status: 200, type: SwaggerMatchesByRoundResponseDto })
  @ApiParam({
    name: 'round',
    description: 'Searched round',
  })
  @Get('matchesByRound/:round')
  async getMatchesByRound(@Param('round') round: number) {
    return await this.worldCupService.getMatchesByRound(round);
  }
}
