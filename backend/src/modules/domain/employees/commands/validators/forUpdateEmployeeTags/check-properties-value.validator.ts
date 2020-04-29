import { UpdateEmployeeTags } from '../../update-employee-tags.command';
import { JoiCommandValidator } from '../../../../../common/commands/validation';

import * as joi from '@hapi/joi';

export class CheckUpdateTagsPropertiesValue extends JoiCommandValidator<
  UpdateEmployeeTags
> {
  getSchema(command: UpdateEmployeeTags) {
    return joi.object({
      employeeId: joi.number().required(),
      tags: joi.string().allow('').optional(),
    });
  }
}
