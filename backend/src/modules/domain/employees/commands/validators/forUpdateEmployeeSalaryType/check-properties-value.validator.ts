import { UpdateEmployeeSalaryType } from '../../update-employee-salary-type.command';
import { JoiCommandValidator } from '../../../../../common/commands/validation';

import * as joi from '@hapi/joi';

export class CheckUpdateSalaryTypePropertiesValue extends JoiCommandValidator<
  UpdateEmployeeSalaryType
> {
  getSchema(command: UpdateEmployeeSalaryType) {
    return joi.object({
      employeeId: joi.number().required(),
      salaryType: joi.string().required()
    });
  }
}
