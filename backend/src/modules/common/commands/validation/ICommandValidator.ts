import { IValidationResult } from './IValidationResult';
import { ICommand } from '../ICommand';

export interface ICommandValidator<TCommand extends ICommand = any> {
  validate(command: TCommand): Promise<IValidationResult>;
}
