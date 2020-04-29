import { DomainEvent } from '../../../common/events/domainEvent';

export class ProductAddedToOrder implements DomainEvent {
  orderId: string;
  productId: string;
  constructor(orderId: string, productId: string) {
    this.orderId = orderId;
    this.productId = productId;
  }
}
