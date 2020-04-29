import { CommandValidator } from '../../../../../common/commands/validation';
import { CreateOrder } from '../../createOrder';
import { CompositeValidator } from '../../../../../common/commands/validation/CompositeValidator';
import { CheckPropertiesValue } from './checkPropertiesValue';
import { CheckProductExist } from './checkProductExist';

@CommandValidator(CreateOrder)
export class CreateOrderCompositeValidator extends CompositeValidator<
  CreateOrder
> {
  constructor(
    joiValidator: CheckPropertiesValue,
    productValidator: CheckProductExist,
  ) {
    super([joiValidator, productValidator]);
  }
}
