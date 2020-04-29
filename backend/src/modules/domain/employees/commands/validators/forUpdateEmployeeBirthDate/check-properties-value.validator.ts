import { UpdateEmployeeBirthdate } from '../../update-employee-birthdate.command';
import { JoiCommandValidator } from '../../../../../common/commands/validation';

import * as joi from '@hapi/joi';

export class CheckUpdateBirthDatePropertiesValue extends JoiCommandValidator<
  UpdateEmployeeBirthdate
> {
  getSchema(command: UpdateEmployeeBirthdate) {
    return joi.object({
      employeeId: joi.number().required(),
      birthdate: joi
      .string()
      .isoDate()
      .required(),
    });
  }
}
