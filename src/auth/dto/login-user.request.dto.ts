import { IsDefined, IsString } from 'class-validator';

export class LoginUserRequestDto {
  @IsDefined()
  @IsString()
  username: string;

  @IsDefined()
  @IsString()
  password: string;
}
