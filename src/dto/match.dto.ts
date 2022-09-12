import { NationalTeam } from 'src/entities/national-team.entity';
import { MatchStatus } from 'src/enums/match-status.enum';

export class MatchDto {
  id: string;
  round: number;
  status: MatchStatus;
  winner_code: number;
  homeTeam: NationalTeam;
  awayTeam: NationalTeam;
  home_score: number;
  away_score: number;
}
