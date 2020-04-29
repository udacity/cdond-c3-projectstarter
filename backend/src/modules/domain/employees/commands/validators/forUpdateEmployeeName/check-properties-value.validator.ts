import { UpdateEmployeeName } from '../../update-employee-name.command';
import { JoiCommandValidator } from '../../../../../common/commands/validation';

import * as joi from '@hapi/joi';

export class CheckUpdateNamePropertiesValue extends JoiCommandValidator<
  UpdateEmployeeName
> {
  getSchema(command: UpdateEmployeeName) {
    return joi.object({
      employeeId: joi.number().required(),
      firstName: joi.string().required(),
      middleName: joi
        .string()
        .allow('')
        .optional(),
      lastName: joi.string().required(),
      secondLastName: joi
        .string()
        .allow('')
        .optional()
    });
  }
}
