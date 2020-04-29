import 'reflect-metadata';

import { COMMAND_VALIDATOR_METADATA } from '../constants';
import { ICommand } from '../ICommand';

export const CommandValidator = (command: ICommand): ClassDecorator => {
  return (target: object) => {
    Reflect.defineMetadata(COMMAND_VALIDATOR_METADATA, command, target);
  };
};
