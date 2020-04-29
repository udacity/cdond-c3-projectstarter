import { ICommandValidator } from './ICommandValidator';
import { IValidationResult } from './IValidationResult';

export class CompositeValidator<TCommand>
  implements ICommandValidator<TCommand> {
  constructor(private validators: ICommandValidator<TCommand>[]) {}

  async validate(command: TCommand): Promise<IValidationResult> {
    const results: IValidationResult[] = [];
    for (const validator of this.validators) {
      const result = await validator.validate(command);
      if (result.hasError) {
        results.push(result);
      }
    }

    if (results.length > 0) {
      const errors = results.map(value => value.errors);
      return {
        hasError: true,
        errors: [].concat.apply([], errors),
      };
    }
    return {
      hasError: false,
      errors: [],
    };
  }
}
