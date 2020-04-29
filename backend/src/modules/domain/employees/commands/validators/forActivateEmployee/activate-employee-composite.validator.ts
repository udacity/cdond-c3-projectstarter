import { CommandValidator } from '../../../../../common/commands/validation';
import { CompositeValidator } from '../../../../../common/commands/validation/CompositeValidator';
import { ActivateEmployee } from '../../activate-employee.command';
import { CheckEmployeeExistsOnActivate } from './check-employee-exists.validator';

@CommandValidator(ActivateEmployee)
export class ActivateEmployeeCompositeValidator extends CompositeValidator<
  ActivateEmployee
> {
  constructor(checkEmployeeExists: CheckEmployeeExistsOnActivate) {
    super([checkEmployeeExists]);
  }
}
