import { BadRequestException, Injectable, Type } from '@nestjs/common';
import { ICommandValidator } from './validation';
import { ICommand } from './ICommand';
import { CommandBus } from '@nestjs/cqrs';
import { COMMAND_VALIDATOR_METADATA } from './constants';
import {
  CommandValidatorMetatype,
  ICommandDispatcher,
} from './commandDispatcher';

import { InvalidCommandValidatorException } from './validation/invalidCommandValidatorException';
import { ICommandHandler } from './ICommandHandler';

export type CommandHandlerMetatype = Type<ICommandHandler<ICommand, any>>;

@Injectable()
export class SyncCommandDispatcher implements ICommandDispatcher {
  validators: Map<string, ICommandValidator<ICommand>> = new Map<
    string,
    ICommandValidator<ICommand>
  >();
  moduleRef = null;

  constructor(private commandBus: CommandBus) {}

  registerValidators(commandValidators: CommandValidatorMetatype[]) {
    commandValidators.forEach(validator => this.registerValidator(validator));
  }

  setModuleRef(moduleRef) {
    this.moduleRef = moduleRef;
  }

  async execute<T extends ICommand>(command: T): Promise<any> {
    const validator = this.validators.get(this.getCommandName(command));
    if (!validator) {
      throw new InvalidCommandValidatorException();
    }
    const result = await validator.validate(command);
    if (result.hasError) {
      throw new BadRequestException(result.errors);
    }
    return await this.commandBus.execute(command);
  }

  protected registerValidator(validator: CommandValidatorMetatype) {
    if (!this.moduleRef) {
      throw new Error('Invalid module ref');
    }
    const instance = this.moduleRef.get(validator);
    if (!instance) return;

    const target = this.reflectCommandName(validator);
    if (target) {
      this.bindValidator(instance as ICommandValidator<ICommand>, target.name);
    }
  }

  bindValidator<T extends ICommand>(
    validator: ICommandValidator<T>,
    name: string,
  ) {
    this.validators.set(name, validator);
  }

  private getCommandName(command): string {
    const { constructor } = Object.getPrototypeOf(command);
    return constructor.name as string;
  }

  private reflectCommandName(
    validator: CommandValidatorMetatype,
  ): FunctionConstructor {
    return Reflect.getMetadata(COMMAND_VALIDATOR_METADATA, validator);
  }
}
