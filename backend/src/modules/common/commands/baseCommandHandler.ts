import { ICommand } from './ICommand';
import { ICommandHandler } from './ICommandHandler';

export abstract class BaseCommandHandler<TCommand extends ICommand, TResult>
  implements ICommandHandler<TCommand, TResult> {
  execute(command: TCommand): Promise<any> {
    return this.handle(command);
  }

  abstract handle(command: TCommand): Promise<TResult>;
}
