import { SerializedUser } from './../dto/serialized-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';

@Injectable()
export class WebappService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getScoreboard() {
    const response = await this.userRepository.find({
      order: {
        id: 'DESC',
      },
    });
    return response.map((user) => plainToClass(SerializedUser, user));
  }

  async savePredictionsForUser(savePredictionsForUser: any) {
    return `Successfully saved all predictions for requested user: ${savePredictionsForUser?.username}`;
  }

  async getAllPredictionsForUser(id: number) {
    return `All predictions for user id: ${id}`;
  }
}
