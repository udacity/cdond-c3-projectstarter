import { Type } from '@nestjs/common';

import { ICommandValidator } from './validation';
import { ICommand } from './ICommand';

export type CommandValidatorMetatype = Type<ICommandValidator<ICommand>>;

export interface ICommandDispatcher {
  execute<TCommand>(command: TCommand): Promise<any>;

  registerValidators(commandValidator: CommandValidatorMetatype[]);
}
