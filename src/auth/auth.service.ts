import { configService } from 'src/config/config.service';
import { LoginUserRequestDto } from './dto/login-user.request.dto';
import { RegisterUserRequestDto } from './dto/register-user.request.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { comparePassword, encodePassword } from 'src/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(registerUserDto: RegisterUserRequestDto) {
    const hashedPassword = await encodePassword(registerUserDto.password);
    const userExist = await this.userRepository.findOne({
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
      const payload = {
        sub: user.id,
        username: user.username,
        name: user.name,
        lastname: user.lastname,
      };
      const access_token = this.jwtService.sign(payload, {
        secret: configService.getValue('JWT_SECRET'),
        expiresIn: '1h',
      });
      return {
        access_token: access_token,
        expiresIn: 3600,
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
        const payload = {
          sub: user.id,
          username: user.username,
          name: user.name,
          lastname: user.lastname,
        };
        const access_token = this.jwtService.sign(payload, {
          secret: configService.getValue('JWT_SECRET'),
          expiresIn: '1h',
        });
        return {
          access_token: access_token,
          expiresIn: 3600,
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
