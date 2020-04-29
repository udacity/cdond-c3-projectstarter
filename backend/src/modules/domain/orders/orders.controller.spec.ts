// @ts-ignore

import { OrdersController } from './orders.controller';
import { OrderRequest } from './requests/orderRequest';
import { CreateOrder } from './commands/createOrder';
import { SyncCommandDispatcher } from '../../common/commands';
import { OrderRepository } from './repositories/orderRepository';

describe('Order Controller', () => {
  const MockComanddDispatcher = jest.fn<SyncCommandDispatcher, []>(
    () =>
      ({
        execute: jest.fn(),
      } as any),
  );

  const MockOrderRepository = jest.fn<OrderRepository, []>();

  const commandDispatcher: SyncCommandDispatcher = new MockComanddDispatcher();
  const orderRepository = new MockOrderRepository();
  describe('When order request goes in to the controller', () => {
    // @ts-ignore
    it('should call save order command', async () => {
      const orderController = new OrdersController(
        commandDispatcher,
        orderRepository,
      );

      const orderRequest: OrderRequest = {
        productId: 'testId',
        productQuantity: 123,
      };

      const user: any = {
        username: 'test',
      };

      const response = await orderController.createOrder(
        { username: 'test' },
        orderRequest,
      );

      const expectedCommand: CreateOrder = {
        productId: orderRequest.productId,
        productQuantity: orderRequest.productQuantity,
        userId: user.username,
      };
      expect(commandDispatcher.execute).toHaveBeenCalledWith(expectedCommand);
    });
  });
});
