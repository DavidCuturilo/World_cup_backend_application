import { IsDefined, IsString } from 'class-validator';

export class RegisterUserRequestDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  lastname: string;

  @IsDefined()
  @IsString()
  username: string;

  @IsDefined()
  @IsString()
  password: string;
}
