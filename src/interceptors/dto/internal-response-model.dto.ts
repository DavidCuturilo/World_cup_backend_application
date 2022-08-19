import { GetStandingsResponseDto } from './../../services/world-cup/dto/get-standings.response.dto';
import { GetMatchesByRoundResponseDto } from './../../services/world-cup/dto/get-matches-by-round.response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class InternalResponse<T> {
  status: number;
  payload: T;
}

export class SwaggerRegisterUserResponseDto
  implements InternalResponse<string>
{
  @ApiProperty({ example: 201 })
  status: number;
  payload: string;
}

export class SwaggerLoginUserResponseDto implements InternalResponse<string> {
  @ApiProperty({ example: 200 })
  status: number;
  payload: string;
}

export class SwaggerStandingsResponseDto
  implements InternalResponse<GetStandingsResponseDto>
{
  @ApiProperty({ example: 200 })
  status: number;
  payload: GetStandingsResponseDto;
}

export class SwaggerMatchesByRoundResponseDto
  implements InternalResponse<GetMatchesByRoundResponseDto>
{
  @ApiProperty({ example: 200 })
  status: number;
  payload: GetMatchesByRoundResponseDto;
}
