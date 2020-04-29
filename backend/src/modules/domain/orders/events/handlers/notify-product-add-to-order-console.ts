import { IEventHandler } from '../../../../common/events';
import { ProductAddedToOrder } from '../ProductAddedToOrder';
import { EventsHandler } from '@nestjs/cqrs';

@EventsHandler(ProductAddedToOrder)
export class NotifyProductAddToOrderConsole
  implements IEventHandler<ProductAddedToOrder> {
  handle(event: ProductAddedToOrder): any {
    console.log('Product added');
  }
}
