import { Exclude } from 'class-transformer';

export class SerializedUser {
  id: number;
  name: string;
  lastname: string;
  username: string;
  points: number;

  @Exclude()
  password: string;
}
