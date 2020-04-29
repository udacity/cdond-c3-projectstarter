import { UpdateEmployeePersonalEmail } from '../../update-employee-personal-email.command';
import { JoiCommandValidator } from '../../../../../common/commands/validation';

import * as joi from '@hapi/joi';

export class CheckUpdatePersonalEmailPropertiesValue extends JoiCommandValidator<
  UpdateEmployeePersonalEmail
> {
  getSchema(command: UpdateEmployeePersonalEmail) {
    return joi.object({
      employeeId: joi.number().required(),
      personalEmail: joi.string().allow('').optional(),
    });
  }
}
