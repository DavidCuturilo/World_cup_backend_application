import { Match } from '../../entities/match.entity';
import { IsDefined, IsNumber } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class SavePredictionRequestDto {
  @IsDefined()
  @IsNumber()
  homeScore: number;

  @IsDefined()
  @IsNumber()
  awayScore: number;

  @IsDefined()
  @IsNumber()
  winnerCode: number;

  @IsDefined()
  user: User;

  @IsDefined()
  match: Match;
}
