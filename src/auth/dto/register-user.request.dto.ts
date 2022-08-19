import { IsDefined, IsString } from 'class-validator';

export class RegisterUserRequestDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  lastName: string;

  @IsDefined()
  @IsString()
  username: string;

  @IsDefined()
  @IsString()
  password: string;
}
