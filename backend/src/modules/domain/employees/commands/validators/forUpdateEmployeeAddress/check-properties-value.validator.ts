import { UpdateEmployeeAddress } from '../../update-employee-address.command';
import { JoiCommandValidator } from '../../../../../common/commands/validation';

import * as joi from '@hapi/joi';

export class CheckUpdateAddressPropertiesValue extends JoiCommandValidator<
  UpdateEmployeeAddress
> {
  getSchema(command: UpdateEmployeeAddress) {
    return joi.object({
      employeeId: joi.number().required(),
      address: joi.string().allow('').optional(),
      country: joi
        .string()
        .required(),
      city: joi.string().required(),
      region: joi.string().required()
    });
  }
}
