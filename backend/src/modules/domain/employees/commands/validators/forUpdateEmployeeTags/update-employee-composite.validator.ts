import { CommandValidator } from '../../../../../common/commands/validation';
import { CompositeValidator } from '../../../../../common/commands/validation/CompositeValidator';
import { UpdateEmployeeTags } from '../../update-employee-tags.command';
import { CheckEmployeeTagsExists } from './check-employee-exists.validator';
import { CheckUpdateTagsPropertiesValue } from './check-properties-value.validator';

@CommandValidator(UpdateEmployeeTags)
export class UpdateEmployeeTagsCompositeValidator extends CompositeValidator<
  UpdateEmployeeTags
> {
  constructor(
    joiValidator: CheckUpdateTagsPropertiesValue,
    checkEmployeeExists: CheckEmployeeTagsExists,
  ) {
    super([joiValidator, checkEmployeeExists]);
  }
}
