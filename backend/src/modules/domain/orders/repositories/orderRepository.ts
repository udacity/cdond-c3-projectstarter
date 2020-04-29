import { BaseRepository } from '../../../common/entities';
import { Order } from '../entities/order.entity';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { SyncEventDispatcher } from '../../../common/events';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderRepository extends BaseRepository<string, Order> {
  constructor(
    @InjectEntityManager()
    manager: EntityManager,
    eventDispatcher: SyncEventDispatcher,
  ) {
    super(manager.getRepository(Order), eventDispatcher);
  }
}
