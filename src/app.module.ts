import { Session } from './entities/session.entity';
import { LoggerMiddleware } from './middleware/logger-middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { WebappModule } from './webapp/webapp.module';
import { WorldCupService } from './services/world-cup/world-cup.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { configService } from './config/config.service';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Session]),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    WebappModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, WorldCupService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}

  getDataSource() {
    return this.dataSource;
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
