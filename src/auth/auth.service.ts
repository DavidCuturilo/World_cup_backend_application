import { LoginUserRequestDto } from './dto/login-user.request.dto';
import { RegisterUserRequestDto } from './dto/register-user.request.dto';
import { Injectable } from '@nestjs/common';
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
    console.log(hashedPassword);
    const userData: RegisterUserRequestDto = {
      name: registerUserDto.name,
      lastName: registerUserDto.lastName,
      username: registerUserDto.username,
      password: hashedPassword,
    };
    const user = await this.userRepository.save(userData);
    if (user) return 'User successfully registered';
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
          lastName: user.lastName,
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
