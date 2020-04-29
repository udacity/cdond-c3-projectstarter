import * as joi from '@hapi/joi';
import { IValidationResult } from './IValidationResult';
import { ICommandValidator } from './ICommandValidator';

export abstract class JoiCommandValidator<TCommand>
  implements ICommandValidator<TCommand> {
  async validate(command: TCommand): Promise<IValidationResult> {
    const schema = this.getSchema(command);
    const valResult = schema.validate(command);
    if (valResult.error) {
      return {
        hasError: true,
        errors: valResult.error.details.map(d => ({
          message: d.message,
          field: d.context.key,
          fieldLabel: d.context.label,
          value: command[d.context.key],
        })),
      };
    }

    return {
      hasError: false,
      errors: [],
    };
  }

  abstract getSchema(command: TCommand);
}
