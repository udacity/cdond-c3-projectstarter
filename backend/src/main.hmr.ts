import { NestFactory } from '@nestjs/core';
import { AppModule } from 'modules/app/app.module';
import { ConfigService } from './modules/config/config.service';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get('ConfigService');
  await app.listen(config.PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
