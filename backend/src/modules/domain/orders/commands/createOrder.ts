import { ICommand } from '../../../common/commands';

export class CreateOrder implements ICommand {
  productId: string;
  productQuantity: number;
  userId: string;
  constructor(productId: string, productQuantity: number, userId: string) {
    this.productId = productId;
    this.productQuantity = productQuantity;
    this.userId = userId;
  }
}
