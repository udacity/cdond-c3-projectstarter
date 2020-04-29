import { CommandValidator } from '../../../../../common/commands/validation';
import { CompositeValidator } from '../../../../../common/commands/validation/CompositeValidator';
import { DeactivateEmployee } from '../../deactivate-employee.command';
import { CheckEmployeeExistsOnDeactivate } from './check-employee-exists.validator';

@CommandValidator(DeactivateEmployee)
export class DeactivateEmployeeCompositeValidator extends CompositeValidator<
  DeactivateEmployee
> {
  constructor(checkEmployeeExists: CheckEmployeeExistsOnDeactivate) {
    super([checkEmployeeExists]);
  }
}
