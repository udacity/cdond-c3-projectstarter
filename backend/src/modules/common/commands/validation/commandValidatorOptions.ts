import { Type } from '@nestjs/common';
import { ICommandValidator } from './ICommandValidator';

export interface CommandValidatorOptions {
  validators: Type<ICommandValidator>[];
}
