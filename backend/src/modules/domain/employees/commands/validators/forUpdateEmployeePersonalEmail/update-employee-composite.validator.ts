import { CommandValidator } from '../../../../../common/commands/validation';
import { CompositeValidator } from '../../../../../common/commands/validation/CompositeValidator';
import { UpdateEmployeePersonalEmail } from '../../update-employee-personal-email.command';
import { CheckEmployeePersonalEmailExists } from './check-employee-exists.validator';
import { CheckUpdatePersonalEmailPropertiesValue } from './check-properties-value.validator';

@CommandValidator(UpdateEmployeePersonalEmail)
export class UpdateEmployeePersonalEmailCompositeValidator extends CompositeValidator<
  UpdateEmployeePersonalEmail
> {
  constructor(
    joiValidator: CheckUpdatePersonalEmailPropertiesValue,
    checkEmployeeExists: CheckEmployeePersonalEmailExists,
  ) {
    super([joiValidator, checkEmployeeExists]);
  }
}
