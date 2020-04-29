import { CheckProductExist } from './checkProductExist';
import { ProductRepository } from '../../../repositories/productRepository';
import { CreateOrder } from '../../createOrder';

describe('Check if product exists', () => {
  const MockRepository = jest.fn<ProductRepository, []>(
    () =>
      ({
        where: jest.fn().mockReturnValue({
          get: jest.fn().mockResolvedValue([]),
        }),
      } as any),
  );

  describe('when dispatching a create order program', () => {
    it('it should validate that a the product exist in the db', async () => {
      const validator = new CheckProductExist(new MockRepository());

      const createOrder = new CreateOrder('testProductId', 1, 'TestUserId');
      const result = await validator.validate(createOrder);

      expect(result.hasError).toBeTruthy();
      expect(result.errors).toMatchObject([
        {
          field: 'productId',
          fieldLabel: 'productId',
          message: 'The product is not valid',
          value: 'testProductId',
        },
      ]);
    });
  });
});
