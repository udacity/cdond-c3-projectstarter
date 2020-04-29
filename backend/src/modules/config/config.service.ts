import * as Joi from '@hapi/joi';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AboutInfo } from './about.interface';
import { Product } from '../../modules/domain/orders/entities/product.entity';
import { Order } from '../../modules/domain/orders/entities/order.entity';
import { Employee } from '../domain/employees/entities/employee.entity';

export interface EnvConfig {
  VERSION: string;
  NODE_ENV: string;
  BACKEND_PORT: number;
  LOGGLY_SUBDOMAIN: string;
  LOGGLY_TOKEN: string;
  TYPEORM_CONNECTION: any;
  TYPEORM_ENTITIES: string;
  TYPEORM_HOST: string;
  TYPEORM_PORT: number;
  TYPEORM_DATABASE: string;
  TYPEORM_USERNAME: string;
  TYPEORM_PASSWORD: string;
  TYPEORM_LOGGING: string;
  CORS_WHITELIST: string;
  AUTH0_DOMAIN: string;
  AUTH0_AUDIENCE: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    this.envConfig = this.validateInput(process.env);
  }

  private validateInput(envConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      TYPEORM_CONNECTION: Joi.string().default('postgres'),
      VERSION: Joi.string().default('local'),
      NODE_ENV: Joi.string()
        .valid('local', 'development', 'production', 'test', 'provision')
        .default('local'),
      BACKEND_PORT: Joi.number().default(3030),
      LOGGLY_SUBDOMAIN: Joi.string(),
      LOGGLY_TOKEN: Joi.string(),
      TYPEORM_ENTITIES: Joi.string().required(),
      TYPEORM_USERNAME: Joi.string().required(),
      TYPEORM_PASSWORD: Joi.string().required(),
      TYPEORM_DATABASE: Joi.string().required(),
      TYPEORM_HOST: Joi.string().required(),
      TYPEORM_PORT: Joi.number()
        .integer()
        .default(5432),
      TYPEORM_MIGRATIONS: Joi.string(),
      CORS_WHITELIST: Joi.string().default(''),
      TYPEORM_LOGGING: Joi.string().default('false'),
      // AUTH0_DOMAIN: Joi.string().required(),
      // AUTH0_AUDIENCE: Joi.string().required(),
    }).unknown();
    const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig);


    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }

  get about(): AboutInfo {
    return {
      version: process.env.npm_package_version,
      environment: this.envConfig.NODE_ENV,
    };
  }

  get NODE_ENV(): string {
    return this.envConfig.NODE_ENV;
  }

  get PORT(): number {
    return this.envConfig.BACKEND_PORT;
  }

  get LOGGLY_SUBDOMAIN(): string {
    return this.envConfig.LOGGLY_SUBDOMAIN;
  }

  get LOGGLY_TOKEN(): string {
    return this.envConfig.LOGGLY_TOKEN;
  }

  get CORS_WHITELIST(): string[] {
    if (!this.envConfig.CORS_WHITELIST) {
      return [];
    }
    return this.envConfig.CORS_WHITELIST.split(',');
  }

  get TypeOrmDatabase(): TypeOrmModuleOptions {
    return {
      type: this.envConfig.TYPEORM_CONNECTION,
      host: this.envConfig.TYPEORM_HOST,
      port: this.envConfig.TYPEORM_PORT,
      username: this.envConfig.TYPEORM_USERNAME,
      password: this.envConfig.TYPEORM_PASSWORD,
      database: this.envConfig.TYPEORM_DATABASE,
      entities: [this.envConfig.TYPEORM_ENTITIES],
      // entities: [Product, Order, Employee],
      logging: this.envConfig.TYPEORM_LOGGING === 'true',
      extra: { max: 4, min: 1 },
      synchronize: false,
    };
  }

  get AUTH0_DOMAIN(): string {
    return this.envConfig.AUTH0_DOMAIN;
  }

  get AUTH0_AUDIENCE(): string {
    return this.envConfig.AUTH0_AUDIENCE;
  }
}
