import { WorldCupAuthGuard } from './../../guards/auth.guard';
import { JwtAuthGuard } from './../../auth/jwt-auth.guard';
import {
  SwaggerStandingsResponseDto,
  SwaggerMatchesByRoundResponseDto,
} from './../../interceptors/dto/internal-response-model.dto';
import { WorldCupService } from './world-cup.service';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('World cup routes')
@Controller('world-cup')
@UseGuards(JwtAuthGuard)
@UseGuards(WorldCupAuthGuard)
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
  @Get('matchesByRound')
  async getMatchesByRound(@Query() query: { round: string; slugName: string }) {
    console.log(JSON.stringify(query));
    return await this.worldCupService.getMatchesByRound(
      query.round,
      query.slugName,
    );
  }
}
