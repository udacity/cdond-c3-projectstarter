import { SyncCommandDispatcher } from '../../common/commands';
import { OrderRequest } from './requests/orderRequest';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CreateOrder } from './commands/createOrder';
import { OrderRepository } from './repositories/orderRepository';
import { PaginatedOrderQuery } from './requests/PaginatedOrderQuery';
import { PassportModule} from "@nestjs/passport";
// import { ProductRepository } from './repositories/productRepository';
// import { PaginatedProductQuery } from './requests/paginatedProductQuery';
import { AuthGuard } from '@nestjs/passport';
import { Usr } from '../../auth/user.decorator';
import { User } from '../../auth/user.interface';

@Controller('/orders')
@UseGuards(AuthGuard())
export class OrdersController {
  constructor(
    private readonly commandDispatcher: SyncCommandDispatcher,
    private readonly orderRepository: OrderRepository,
  ) {}

  @Post()
  async createOrder(@Usr() user: User, @Body() orderRequest: OrderRequest) {
    console.log(user);

    const createOrder: CreateOrder = new CreateOrder(
      orderRequest.productId,
      orderRequest.productQuantity,
      user.username,
    );
    await this.commandDispatcher.execute(createOrder);

    return null;
  }

  @Get()
  async getOrders(@Query() query: PaginatedOrderQuery) {
    return this.orderRepository
      .where({ id: query.id })
      .relation(query.relations)
      .paginate(query.page, query.perPage);
  }
}
