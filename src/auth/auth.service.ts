import { LoginUserRequestDto } from './dto/login-user.request.dto';
import { RegisterUserRequestDto } from './dto/register-user.request.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { comparePassword, encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerUser(registerUserDto: RegisterUserRequestDto) {
    const hashedPassword = await encodePassword(registerUserDto.password);
    const userExist = this.userRepository.findOne({
      where: { username: registerUserDto.username },
    });

    if (userExist) {
      throw new HttpException('Bad Request', HttpStatus.NOT_ACCEPTABLE);
    }

    const userData: RegisterUserRequestDto = {
      name: registerUserDto.name,
      lastname: registerUserDto.lastname,
      username: registerUserDto.username,
      password: hashedPassword,
    };
    const user = await this.userRepository.save(userData);
    if (user) {
      console.log('User successfully registered');
      return {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        username: user.username,
      };
    }
    return 'Error in registration process';
  }

  async loginUser(loginUserDto: LoginUserRequestDto) {
    const { username, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (user) {
      const matched = comparePassword(password, user.password);
      if (matched) {
        console.log('Successfully logged in user.');
        return {
          id: user.id,
          name: user.name,
          lastname: user.lastname,
          username: user.username,
        };
      } else {
        console.log('Passwords do not match.');
        return null;
      }
    }
    return 'Requested user does not exist';
  }

  async validateUser(username: string, password: string) {
    const userDB = await this.userRepository.findOneBy({ username });
    if (userDB) {
      const matched = comparePassword(password, userDB.password);
      if (matched) {
        return userDB;
      } else {
        console.log('Passwords do not match.');
        return null;
      }
    }
    console.log('User validation failed');
    return null;
  }
}
