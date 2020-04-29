import { CommandValidator } from '../../../../../common/commands/validation';
import { CompositeValidator } from '../../../../../common/commands/validation/CompositeValidator';
import { UpdateEmployeeName } from '../../update-employee-name.command';
import { CheckEmployeeNameExists } from './check-employee-exists.validator';
import { CheckUpdateNamePropertiesValue } from './check-properties-value.validator';

@CommandValidator(UpdateEmployeeName)
export class UpdateEmployeeNameCompositeValidator extends CompositeValidator<
  UpdateEmployeeName
> {
  constructor(
    joiValidator: CheckUpdateNamePropertiesValue,
    checkEmployeeExists: CheckEmployeeNameExists,
  ) {
    super([joiValidator, checkEmployeeExists]);
  }
}
