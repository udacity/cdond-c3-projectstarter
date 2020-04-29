import { OrderCreator } from './orderCreator';
import { CreateOrder } from '../createOrder';

import { OrderRepository } from '../../repositories/orderRepository';
import { ProductRepository } from '../../repositories/productRepository';

describe('Order Creator', () => {
  const MockOrderRepository = jest.fn<OrderRepository, []>(
    () =>
      ({
        save: jest.fn(),
        findById: jest.fn(),
      } as any),
  );

  const MockProductRepository = jest.fn<ProductRepository, []>(() => {
    return {
      save: jest.fn(),
      findById: jest.fn().mockResolvedValue({ id: 'ProductId' }),
    } as any;
  });

  const orderRepository = new MockOrderRepository();
  const productRepository = new MockProductRepository();

  describe('when an user creates an order', () => {
    const handler = new OrderCreator(orderRepository, productRepository);

    // @ts-ignore
    it('should add order to the repo', async () => {
      const creatOrder: CreateOrder = new CreateOrder(
        'productId',
        123,
        'userId',
      );

      await handler.handle(creatOrder);

      expect(productRepository.findById).toBeCalled();
      expect(orderRepository.save).toBeCalled();
    });
  });
});
