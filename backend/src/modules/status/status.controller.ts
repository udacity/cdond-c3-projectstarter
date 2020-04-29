import { Get, Controller } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Controller('status')
export class StatusController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  status() {
    const version = this.configService.about.version;
    const environment = this.configService.about.environment;

    return {
      status: 'ok',
      version,
      environment,
    };
  }
}
