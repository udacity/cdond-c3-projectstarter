import { Module, OnModuleInit, Scope, ExecutionContext } from '@nestjs/common';
import { CommandHandlers } from './commands/handlers';
import { CommonModule } from '../../common';
import { EventHandlers } from './events/handlers';
import { ModuleRef } from '@nestjs/core';
import { AppLogger } from '../../app/app.logger';
import { ProductRepository } from './repositories/productRepository';
import { OrderRepository } from './repositories/orderRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { SyncCommandDispatcher } from '../../common/commands';
import { CommandValidators } from './commands/validators';
import { AuthModule } from '../../auth/auth.module';
import { PassportModule} from "@nestjs/passport";

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([Product, Order]),
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [OrdersController],
  providers: [
    ProductRepository,
    OrderRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...CommandValidators,
    AppLogger,
  ],
})
export class OrdersModule implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly command$: SyncCommandDispatcher,
  ) {}

  onModuleInit() {
    this.command$.setModuleRef(this.moduleRef);
    this.command$.registerValidators(CommandValidators);
  }
}
