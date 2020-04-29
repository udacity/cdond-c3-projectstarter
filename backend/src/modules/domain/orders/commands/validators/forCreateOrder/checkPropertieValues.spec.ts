import { CheckPropertiesValue } from './checkPropertiesValue';
import { CreateOrder } from '../../createOrder';

describe('Create Order Validator', () => {
  describe('When sending a in complete save order command', () => {
    it('should return an error if the productId is null', async () => {
      const createOrderValidator = new CheckPropertiesValue();

      // @ts-ignore
      const createOrder = new CreateOrder(null, 'df', null);
      const result = await createOrderValidator.validate(createOrder);

      expect(result.hasError).toBeTruthy();
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should pass the validation if the command is correct', async () => {
      const createOrderValidator = new CheckPropertiesValue();

      // @ts-ignore
      const createOrder = new CreateOrder(
        'a7ddff7e-ae95-47e8-8bf2-a651541d1dcb',
        1,
        'UserId',
      );
      const result = await createOrderValidator.validate(createOrder);

      expect(result.hasError).toBeFalsy();
      expect(result.errors.length).toEqual(0);
    });
  });
});
