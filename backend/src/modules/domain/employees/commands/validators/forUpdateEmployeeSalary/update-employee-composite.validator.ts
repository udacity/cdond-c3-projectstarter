import { CommandValidator } from '../../../../../common/commands/validation';
import { CompositeValidator } from '../../../../../common/commands/validation/CompositeValidator';
import { UpdateEmployeeSalary } from '../../update-employee-salary.command';
import { CheckEmployeeSalaryExists } from './check-employee-exists.validator';
import { CheckUpdateSalaryPropertiesValue } from './check-properties-value.validator';

@CommandValidator(UpdateEmployeeSalary)
export class UpdateEmployeeSalaryCompositeValidator extends CompositeValidator<
  UpdateEmployeeSalary
> {
  constructor(
    joiValidator: CheckUpdateSalaryPropertiesValue,
    checkEmployeeExists: CheckEmployeeSalaryExists,
  ) {
    super([joiValidator, checkEmployeeExists]);
  }
}
