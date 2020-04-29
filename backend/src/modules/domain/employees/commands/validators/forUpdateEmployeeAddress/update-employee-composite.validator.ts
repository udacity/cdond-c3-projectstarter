import { CommandValidator } from '../../../../../common/commands/validation';
import { CompositeValidator } from '../../../../../common/commands/validation/CompositeValidator';
import { UpdateEmployeeAddress } from '../../update-employee-address.command';
import { CheckEmployeeAddressExists } from './check-employee-exists.validator';
import { CheckUpdateAddressPropertiesValue } from './check-properties-value.validator';

@CommandValidator(UpdateEmployeeAddress)
export class UpdateEmployeeAddressCompositeValidator extends CompositeValidator<
  UpdateEmployeeAddress
> {
  constructor(
    joiValidator: CheckUpdateAddressPropertiesValue,
    checkEmployeeExists: CheckEmployeeAddressExists,
  ) {
    super([joiValidator, checkEmployeeExists]);
  }
}
