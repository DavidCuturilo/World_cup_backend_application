import { JwtAuthGuard } from './jwt-auth.guard';
import {
  SwaggerRegisterUserResponseDto,
  SwaggerLoginUserResponseDto,
} from './../interceptors/dto/internal-response-model.dto';
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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth routes')
@UseInterceptors(TransformInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, type: SwaggerRegisterUserResponseDto })
  @Post('registerUser')
  async registerUser(@Body() registerUserDto: RegisterUserRequestDto) {
    return this.authService.registerUser(registerUserDto);
  }

  @ApiResponse({ status: 200, type: SwaggerLoginUserResponseDto })
  @UseGuards(LocalAuthGuard)
  @Post('loginUser')
  async loginUser(@Body() loginUserDto: LoginUserRequestDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('status')
  async getAuthStatus(@Req() req: Request) {
    return req.user;
  }
}
