import { CommandValidator } from '../../../../../common/commands/validation';
import { CompositeValidator } from '../../../../../common/commands/validation/CompositeValidator';
import { CreateEmployee } from '../../create-employee.command';
import { CheckPropertiesValue } from './check-properties-value.validator';

@CommandValidator(CreateEmployee)
export class CreateEmployeeCompositeValidator extends CompositeValidator<
  CreateEmployee
> {
  constructor(joiValidator: CheckPropertiesValue) {
    super([joiValidator]);
  }
}
