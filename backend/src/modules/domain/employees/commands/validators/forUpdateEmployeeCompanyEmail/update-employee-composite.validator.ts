import { CommandValidator } from '../../../../../common/commands/validation';
import { CompositeValidator } from '../../../../../common/commands/validation/CompositeValidator';
import { UpdateEmployeeCompanyEmail } from '../../update-employee-company-email.command';
import { CheckEmployeeCompanyEmailExists } from './check-employee-exists.validator';
import { CheckUpdateCompanyEmailPropertiesValue } from './check-properties-value.validator';

@CommandValidator(UpdateEmployeeCompanyEmail)
export class UpdateEmployeeCompanyEmailCompositeValidator extends CompositeValidator<
  UpdateEmployeeCompanyEmail
> {
  constructor(
    joiValidator: CheckUpdateCompanyEmailPropertiesValue,
    checkEmployeeExists: CheckEmployeeCompanyEmailExists,
  ) {
    super([joiValidator, checkEmployeeExists]);
  }
}
