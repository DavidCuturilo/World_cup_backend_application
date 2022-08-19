import { Session } from './entities/session.entity';
import { GlobalExceptionFilter } from './filters/exception-filter';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { configService } from './config/config.service';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import * as basicAuth from 'express-basic-auth';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger,
  });
  const sessionRepository = app
    .get(AppModule)
    .getDataSource()
    .getRepository(Session);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.use(
    session({
      name: 'SESSION_ID',
      secret: configService.getValue('SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
      store: new TypeormStore({
        cleanupLimit: 2,
        ttl: 86400,
      }).connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(
    ['/api'],
    basicAuth({
      challenge: true,
      users: {
        [configService.getValue('SWAGGER_USER')]:
          configService.getValue('SWAGGER_PASSWORD'),
      },
    }),
  );

  const devSwaggerConfig = new DocumentBuilder()
    .setTitle('World cup Developer API')
    .setDescription('World cup Developer API documentation')
    .setVersion('1.0')
    .addTag('Webapp routes')
    .addTag('World cup routes')
    .addTag('Auth routes')
    .build();
  const devSwaggerDocument = SwaggerModule.createDocument(
    app,
    devSwaggerConfig,
  );

  writeFileSync('./swagger-spec.json', JSON.stringify(devSwaggerDocument));

  SwaggerModule.setup('api', app, devSwaggerDocument);

  await app.listen(configService.getPort());
  logger.log(
    `Application is successfully running on port: ${configService.getPort()} 🔥🔥🔥`,
  );
}
bootstrap();
