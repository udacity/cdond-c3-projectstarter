import { LoggerService, Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { Loggly } from 'winston-loggly-bulk';
import { SlackWebHook } from 'winston-slack-webhook';
import * as dotenv from 'dotenv';
dotenv.config();

const logglySubdomain = process.env.LOGGLY_SUBDOMAIN;
const logglyToken = process.env.LOGGLY_TOKEN;

const getLogglyTransport = () => {
  return new Loggly({
    subdomain: logglySubdomain,
    token: logglyToken,
    tags: ['glee2-backend'],
    level: process.env.LOGGLY_LEVEL || 'info',
    json: true,
    isBulk: true,
  });
};

const getSlackTransport = () => {
  const webhookUrl = process.env.SLACK_LOGGER_WEBHOOK;
  if (!webhookUrl) return;
  const channel = process.env.SLACK_LOGGER_CHANNEL;
  const username = process.env.SLACK_LOGGER_USERNAME;
  const iconUrl = process.env.SLACK_LOGGER_ICON_URL;

  return new SlackWebHook({
    level: 'error',
    webhookUrl,
    channel,
    username: username || 'Logger',
    iconUrl:
      iconUrl ||
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Emblem-important-red.svg/500px-Emblem-important-red.svg.png',
  });
};

@Injectable()
export class AppLogger implements LoggerService {
  private logger;

  constructor() {
    const logConsole = new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      format: winston.format.simple(),
    });

    const transports = [logConsole];

    const hasLogglyConfig = logglySubdomain && logglyToken;
    if (hasLogglyConfig) {
      transports.push(getLogglyTransport());
    }

    const slackTransport = getSlackTransport();
    if (slackTransport) {
      transports.push(slackTransport);
    }

    this.logger = winston.createLogger({
      transports,
    });
  }

  log(message: string) {
    this.logger.log('debug', { message });
  }

  error(message: string, trace = '', context = '') {
    this.logger.error({ message, trace, context });
  }

  warn(message: string) {
    this.logger.warn({ message });
  }

  info(message: string) {
    this.logger.info({ message });
  }

  debug(message: string) {
    this.logger.debug({ message });
  }
}
