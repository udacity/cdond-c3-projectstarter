import { Order } from './order.entity';
import { Product } from './product.entity';
import { ProductAddedToOrder } from '../events/ProductAddedToOrder';

describe('Order', () => {
  describe('When adding a product', () => {
    const order = new Order();
    order.id = 'TestId';

    const productToAdd = new Product();
    productToAdd.id = 'testId';

    order.addProduct(productToAdd);

    it('should add the product to the products collection', () => {
      expect(order.getProducts()).toContain(productToAdd);
    });

    it('should apply ProductAddedToOrderEvent', () => {
      const raisedEvents = order.events();

      expect(raisedEvents).toMatchObject([
        new ProductAddedToOrder(order.id, productToAdd.id),
      ]);
    });
  });
});
