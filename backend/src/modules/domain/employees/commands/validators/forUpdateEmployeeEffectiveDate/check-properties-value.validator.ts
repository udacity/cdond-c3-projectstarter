import { UpdateEmployeeEffectiveDate } from '../../update-employee-effective-date.command';
import { JoiCommandValidator } from '../../../../../common/commands/validation';

import * as joi from '@hapi/joi';

export class CheckUpdateEffectiveDatePropertiesValue extends JoiCommandValidator<
  UpdateEmployeeEffectiveDate
> {
  getSchema(command: UpdateEmployeeEffectiveDate) {
    return joi.object({
      employeeId: joi.number().required(),
      effectiveDate: joi
      .string()
      .isoDate()
      .required(),
    });
  }
}
