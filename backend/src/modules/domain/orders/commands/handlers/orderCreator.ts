import { CreateOrder } from '../createOrder';
import { BaseCommandHandler } from '../../../../common/commands';
import { OrderRepository } from '../../repositories/orderRepository';
import { ProductRepository } from '../../repositories/productRepository';
import { Order } from '../../entities/order.entity';
import { CommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@CommandHandler(CreateOrder)
@Injectable()
export class OrderCreator extends BaseCommandHandler<CreateOrder, void> {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
  ) {
    super();
  }

  async handle(command: CreateOrder): Promise<void> {
    const order = new Order({ id: uuid() });
    await this.orderRepository.save(order);

    const product = await this.productRepository.findById(command.productId);

    order.addProduct(product);

    await this.orderRepository.save(order);
  }
}
