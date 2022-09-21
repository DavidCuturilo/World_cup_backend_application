import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from 'src/entities/match.entity';
import { Prediction } from 'src/entities/prediction.entity';
import { MatchStatus } from 'src/enums/match-status.enum';
import { Repository } from 'typeorm';

@Injectable()
export class HelpersService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
  ) {}

  async calculatePredictionPoints(prediction: Prediction) {
    const match = await this.matchRepository.findOne({
      where: { id: prediction.match_id },
    });

    if (match.status === MatchStatus.NOT_STARTED) {
      return 0;
    }

    const homeScore = match.homeScore;
    const awayScore = match.awayScore;

    if (
      homeScore === prediction.homeScore &&
      awayScore === prediction.awayScore
    ) {
      return 4;
    }

    if (match.winnerCode === prediction.winnerCode) {
      if (match.winnerCode === 1) {
        if (
          prediction.homeScore === homeScore ||
          prediction.homeScore + 1 === homeScore ||
          prediction.homeScore - 1 === homeScore
        ) {
          return 2;
        }
        return 1;
      } else if (match.winnerCode === 2) {
        if (
          prediction.awayScore === awayScore ||
          prediction.awayScore + 1 === awayScore ||
          prediction.awayScore - 1 === awayScore
        ) {
          return 2;
        }
        return 1;
      } else if (
        prediction.homeScore + prediction.awayScore - 2 ===
        homeScore + awayScore
      ) {
        return 2;
      }
      return 1;
    }

    return 0;
  }
}
