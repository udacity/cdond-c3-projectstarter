import { BaseRepository } from '../../../common/entities';
import { Product } from '../entities/product.entity';
import { SyncEventDispatcher } from '../../../common/events';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';

import { EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository extends BaseRepository<string, Product> {
  constructor(
    @InjectEntityManager()
    manager: EntityManager,
    eventDispatcher: SyncEventDispatcher,
  ) {
    super(manager.getRepository(Product), eventDispatcher);
  }
}
