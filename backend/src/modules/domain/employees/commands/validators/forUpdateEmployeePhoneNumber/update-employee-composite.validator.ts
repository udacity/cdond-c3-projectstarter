import { CommandValidator } from '../../../../../common/commands/validation';
import { CompositeValidator } from '../../../../../common/commands/validation/CompositeValidator';
import { UpdateEmployeePhoneNumber } from '../../update-employee-phone-number.command';
import { CheckEmployeePhoneNumberExists } from './check-employee-exists.validator';
import { CheckUpdatePhoneNumberPropertiesValue } from './check-properties-value.validator';

@CommandValidator(UpdateEmployeePhoneNumber)
export class UpdateEmployeePhoneNumberCompositeValidator extends CompositeValidator<
  UpdateEmployeePhoneNumber
> {
  constructor(
    joiValidator: CheckUpdatePhoneNumberPropertiesValue,
    checkEmployeeExists: CheckEmployeePhoneNumberExists,
  ) {
    super([joiValidator, checkEmployeeExists]);
  }
}
