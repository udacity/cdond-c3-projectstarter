import { UpdateEmployeeSalary } from '../../update-employee-salary.command';
import { JoiCommandValidator } from '../../../../../common/commands/validation';

import * as joi from '@hapi/joi';

export class CheckUpdateSalaryPropertiesValue extends JoiCommandValidator<
  UpdateEmployeeSalary
> {
  getSchema(command: UpdateEmployeeSalary) {
    return joi.object({
      employeeId: joi.number().required(),
      salary: joi.number().required()
    });
  }
}
