import { configService } from 'src/config/config.service';
import { SessionSerializer } from './utils/session-serializer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './utils/local-strategy';
import { PassportModule } from '@nestjs/passport';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register(configService.getJwtConfig()),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer, JwtStrategy],
})
export class AuthModule {}
