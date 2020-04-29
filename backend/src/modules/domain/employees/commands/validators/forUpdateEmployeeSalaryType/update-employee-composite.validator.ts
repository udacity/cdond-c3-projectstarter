import { CommandValidator } from '../../../../../common/commands/validation';
import { CompositeValidator } from '../../../../../common/commands/validation/CompositeValidator';
import { UpdateEmployeeSalaryType } from '../../update-employee-salary-type.command';
import { CheckEmployeeSalaryTypeExists } from './check-employee-exists.validator';
import { CheckUpdateSalaryTypePropertiesValue } from './check-properties-value.validator';

@CommandValidator(UpdateEmployeeSalaryType)
export class UpdateEmployeeSalaryTypeCompositeValidator extends CompositeValidator<
  UpdateEmployeeSalaryType
> {
  constructor(
    joiValidator: CheckUpdateSalaryTypePropertiesValue,
    checkEmployeeExists: CheckEmployeeSalaryTypeExists,
  ) {
    super([joiValidator, checkEmployeeExists]);
  }
}
