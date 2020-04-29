import { CommandValidator } from '../../../../../common/commands/validation';
import { CompositeValidator } from '../../../../../common/commands/validation/CompositeValidator';
import { UpdateEmployeeDisplayName } from '../../update-employee-display-name.command';
import { CheckEmployeeDisplayNameExists } from './check-employee-exists.validator';
import { CheckUpdateDisplayNamePropertiesValue } from './check-properties-value.validator';

@CommandValidator(UpdateEmployeeDisplayName)
export class UpdateEmployeeDisplayNameCompositeValidator extends CompositeValidator<
  UpdateEmployeeDisplayName
> {
  constructor(
    joiValidator: CheckUpdateDisplayNamePropertiesValue,
    checkEmployeeExists: CheckEmployeeDisplayNameExists,
  ) {
    super([joiValidator, checkEmployeeExists]);
  }
}
