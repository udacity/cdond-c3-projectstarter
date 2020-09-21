import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from './modules/config/config.service';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app/app.module';
import { AppLogger } from './modules/app/app.logger';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as cors from 'cors';
import { TransformInterceptor } from './modules/common/interceptors/TransformInterceptor';
import * as express from 'express';
import { ErrorFilter } from './modules/errors/error.filter';

async function bootstrap() {
  const logger = new AppLogger();
  logger.info(`NodeJs Version ${process.version}`);
  logger.info(JSON.stringify(process.env));
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    logger,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  const apiVersionPrefix: string = process.env.API_VERSION || 'api';
  app.setGlobalPrefix(apiVersionPrefix);
  app.useGlobalInterceptors(new TransformInterceptor());
  const options = new DocumentBuilder()
    .setTitle('Glee2')
    .setDescription('Glee2 API')
    .setVersion('1.0')
    .addTag('customTag')
    .setBasePath(apiVersionPrefix)
    .addBearerAuth()x
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`api/${apiVersionPrefix}`, app, document);
  const config: ConfigService = app.get('ConfigService');
  const whitelist = config.CORS_WHITELIST;
  const corsOptions = {
    origin(origin, callback) {
      const isOriginAllowed = whitelist.indexOf(origin) !== -1;
      const allowAccessAnyway = whitelist.length === 0;
      if (isOriginAllowed || allowAccessAnyway) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };
  app.use(cors(corsOptions));
  app.useGlobalFilters(new ErrorFilter());
  await app.listen(config.PORT);
  logger.log(`Listening on port ${config.PORT}.`);
}

bootstrap();
