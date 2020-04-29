import { UpdateEmployeePhoneNumber } from '../../update-employee-phone-number.command';
import { JoiCommandValidator } from '../../../../../common/commands/validation';

import * as joi from '@hapi/joi';

export class CheckUpdatePhoneNumberPropertiesValue extends JoiCommandValidator<
  UpdateEmployeePhoneNumber
> {
  getSchema(command: UpdateEmployeePhoneNumber) {
    return joi.object({
      employeeId: joi.number().required(),
      phoneNumber: joi.string().allow('').optional(),
    });
  }
}
