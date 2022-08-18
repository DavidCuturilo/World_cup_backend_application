import { AuthenticatedGuard } from './../guards/authenticated.guard';
import { LocalAuthGuard } from './../guards/local.guard';
import { LoginUserRequestDto } from './dto/login-user.request.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RegisterUserRequestDto } from './dto/register-user.request.dto';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { Request } from 'express';

@UseInterceptors(TransformInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registerUser')
  async registerUser(@Body() registerUserDto: RegisterUserRequestDto) {
    return this.authService.registerUser(registerUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('loginUser')
  async loginUser(@Body() loginUserDto: LoginUserRequestDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('status')
  async getAuthStatus(@Req() req: Request) {
    return req.user;
  }
}
