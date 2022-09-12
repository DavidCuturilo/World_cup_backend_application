import { HelpersService } from './../helpers/helpers.service';
import { Prediction } from './../entities/prediction.entity';
import { SavePredictionRequestDto } from './dto/save-prediction.request.dto';
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
    @InjectRepository(Prediction)
    private readonly predictionRepository: Repository<Prediction>,
    private readonly helpersService: HelpersService,
  ) {}

  async getScoreboard() {
    try {
      await this.calculateUsersScore();
    } catch (error) {
      console.log('Calculate error: ' + error);
    }
    const response = await this.userRepository.find({
      order: {
        points: 'DESC',
      },
    });
    return response.map((user) => plainToClass(SerializedUser, user));
  }

  async savePrediction(savePredictionsForUser: SavePredictionRequestDto) {
    const response = await this.predictionRepository.save(
      savePredictionsForUser,
    );

    return (
      `Successfully saved prediction for requested user with id: ` +
      response.user.id
    );
  }

  async getAllPredictions(id: number) {
    return this.predictionRepository.find({
      where: { user_id: id },
      relations: ['match', 'user'],
    });
  }

  async getPrediction(user_id: number, match_id: string) {
    return this.predictionRepository.findOne({
      where: { user_id: user_id, match_id: match_id },
      relations: ['match', 'user'],
    });
  }

  async calculateUsersScore() {
    const users = await this.userRepository.find({
      order: {
        points: 'DESC',
      },
      relations: ['predictions'],
    });

    for (const user of users) {
      let userPoints = 0;
      if (user.predictions) {
        for (const prediction of user.predictions) {
          const points = await this.helpersService.calculatePredictionPoints(
            prediction,
          );

          await this.predictionRepository.update(
            {
              user: prediction.user,
              match: prediction.match,
            },
            {
              pointsEarned: points,
            },
          );
          userPoints += points;
        }

        await this.userRepository.update(
          {
            id: user.id,
          },
          {
            points: userPoints,
          },
        );
      }
    }
  }
}
