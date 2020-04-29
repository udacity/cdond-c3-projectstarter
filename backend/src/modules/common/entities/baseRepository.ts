import {
  DeepPartial,
  FindManyOptions,
  Repository,
  DeleteResult,
} from 'typeorm';
import { IAggregateRoot } from './aggregateRoot';
import { SyncEventDispatcher } from '../events';
import { InjectEntityManager } from '@nestjs/typeorm';

export class PaginateResult<TResult> {
  constructor(params: PaginateResult<TResult> = {} as PaginateResult<TResult>) {
    const { currentPage, data, lastPage, perPage, total } = params;

    this.currentPage = currentPage;
    this.data = data;
    this.lastPage = lastPage;
    this.perPage = perPage;
    this.total = total;
  }

  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  data: TResult[];
}

export abstract class BaseRepository<TId, TEntity extends IAggregateRoot<TId>> {
  wheres: DeepPartial<TEntity>[] = [];
  private relations: string[] = [];

  constructor(
    @InjectEntityManager()
    protected repository: Repository<TEntity>,
    private eventDispatcher: SyncEventDispatcher,
  ) {}

  async save(entity: TEntity): Promise<TEntity> {
    const entityToSave = entity as any;
    const recentlySavedEntity = await this.repository.save(entityToSave);

    const events = entity.publish();

    events.forEach(async event => await this.eventDispatcher.publish(event));

    return recentlySavedEntity;
  }

  async remove(entity: TEntity) {
    const entityToDelete = entity as any;
    await this.repository.remove(entityToDelete);
  }

  async findById(id: TId | any): Promise<TEntity> {
    return this.repository.findOneOrFail(id);
  }

  where(where: DeepPartial<TEntity>): BaseRepository<TId, TEntity> {
    Object.keys(where).forEach(
      key => where[key] === undefined && delete where[key],
    );
    this.wheres.push(where);
    return this;
  }

  relation(relations: string[]): BaseRepository<TId, TEntity> {
    if (relations) this.relations = this.relations.concat(relations);
    return this;
  }

  async get(): Promise<TEntity[]> {
    const queryBuilder = this.repository;
    const queryOptions = this.createQueryOptions();

    return queryBuilder.find(queryOptions);
  }

  private createQueryOptions(): FindManyOptions<TEntity> {
    const where = this.createWhere();
    const relations = this.createRelations();
    return {
      where,
      relations,
    };
  }

  async first(): Promise<TEntity> {
    const queryBuilder = this.repository;
    const queryOptions = this.createQueryOptions();
    return queryBuilder.findOne(queryOptions);
  }

  async paginate(
    page: number = 1,
    perPage: number = 15,
  ): Promise<PaginateResult<TEntity>> {
    const queryBuilder = this.repository;
    const queryOptions = this.createQueryOptions();
    const count = await queryBuilder.count(queryOptions);

    const paginationOptions = Object.assign(
      { skip: perPage * (page - 1), take: perPage },
      queryOptions,
    );

    const data = await queryBuilder.find(paginationOptions);

    const lastPage = Math.floor(count / perPage) + 1;
    return new PaginateResult<TEntity>({
      total: count,
      perPage,
      data,
      lastPage,
      currentPage: lastPage < page ? lastPage : page,
    });
  }

  createWhere(): DeepPartial<TEntity> {
    const wheres = this.wheres.slice();
    this.wheres = [];
    return Object.assign({}, ...wheres);
  }

  private createRelations(): string[] {
    const relations = this.relations;
    this.relations = [];
    return relations;
  }
}
