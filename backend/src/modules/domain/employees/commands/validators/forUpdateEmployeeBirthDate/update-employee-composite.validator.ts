import { CommandValidator } from '../../../../../common/commands/validation';
import { CompositeValidator } from '../../../../../common/commands/validation/CompositeValidator';
import { UpdateEmployeeBirthdate } from '../../update-employee-birthdate.command';
import { CheckEmployeeBirthDateExists } from './check-employee-exists.validator';
import { CheckUpdateBirthDatePropertiesValue } from './check-properties-value.validator';

@CommandValidator(UpdateEmployeeBirthdate)
export class UpdateEmployeeBirthDateCompositeValidator extends CompositeValidator<
  UpdateEmployeeBirthdate
> {
  constructor(
    joiValidator: CheckUpdateBirthDatePropertiesValue,
    checkEmployeeExists: CheckEmployeeBirthDateExists,
  ) {
    super([joiValidator, checkEmployeeExists]);
  }
}
