import { UpdateEmployeeCompanyEmail } from '../../update-employee-company-email.command';
import { JoiCommandValidator } from '../../../../../common/commands/validation';

import * as joi from '@hapi/joi';

export class CheckUpdateCompanyEmailPropertiesValue extends JoiCommandValidator<
  UpdateEmployeeCompanyEmail
> {
  getSchema(command: UpdateEmployeeCompanyEmail) {
    return joi.object({
      employeeId: joi.number().required(),
      companyEmail: joi.string().required(),
    });
  }
}
