import { UpdateEmployeeDisplayName } from '../../update-employee-display-name.command';
import { JoiCommandValidator } from '../../../../../common/commands/validation';

import * as joi from '@hapi/joi';

export class CheckUpdateDisplayNamePropertiesValue extends JoiCommandValidator<
  UpdateEmployeeDisplayName
> {
  getSchema(command: UpdateEmployeeDisplayName) {
    return joi.object({
      employeeId: joi.number().required(),
      displayName: joi.string().required(),
    });
  }
}
