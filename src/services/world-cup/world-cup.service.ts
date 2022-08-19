import { GetStandingsResponseDto } from './dto/get-standings.response.dto';
import { GetMatchesByRoundResponseDto } from './dto/get-matches-by-round.response.dto';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { configService } from 'src/config/config.service';

@Injectable()
export class WorldCupService {
  constructor(private readonly httpService: HttpService) {}

  async getStandings() {
    const response = await lastValueFrom(
      this.httpService.get(`${configService.getValue('STANDINGS')}`),
    );

    const data: GetStandingsResponseDto = response.data;
    return data;
  }

  async getMatchesByRound(round: number) {
    const response = await lastValueFrom(
      this.httpService.get(
        `${configService.getValue('MATCHES_BY_ROUND')}/${round}`,
      ),
    );

    const data: GetMatchesByRoundResponseDto = response.data;
    return data;
  }
}
