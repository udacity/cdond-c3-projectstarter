import { CreateOrderCompositeValidator } from './forCreateOrder/createOrderCompositeValidator';
import { CheckProductExist } from './forCreateOrder/checkProductExist';
import { CheckPropertiesValue } from './forCreateOrder/checkPropertiesValue';

export const CommandValidators = [
  CheckProductExist,
  CheckPropertiesValue,
  CreateOrderCompositeValidator,
];
