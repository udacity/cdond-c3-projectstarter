import { ICommandHandler as handler } from '@nestjs/cqrs';

export interface ICommandHandler<TCommand, TResult> extends handler<TCommand> {
  handle(command: TCommand): Promise<TResult>;
}
