// @ts-ignore

import { BaseRepository } from './baseRepository';
import { EntityManager } from 'typeorm';
import { AggregateRoot } from './aggregateRoot';
import { DomainEvent } from '../events/domainEvent';
import { IEventDispatcher } from '../events/eventDispatcher';
import { Repository } from 'typeorm';
import { SyncEventDispatcher } from '../events';

describe('BaseRepository', () => {
  class TestEntity extends AggregateRoot<string> {
    id: string;
    test: string;
  }

  const MockRepository = jest.fn<Repository<TestEntity>, []>(
    () =>
      ({
        find: jest.fn(),
        findOne: jest.fn(),
        count: jest.fn(),

        save: jest.fn().mockResolvedValue({ id: 'ProductId' }),
        findOneOrFail: jest.fn().mockResolvedValue(new TestEntity()),
      } as any),
  ) as any;

  class TestRepository extends BaseRepository<string, TestEntity> {}

  const MockSyncEventDispatcher = jest.fn<SyncEventDispatcher, []>(
    () =>
      ({
        publish: jest.fn().mockResolvedValue(true),
      } as any),
  );

  let testRepo: TestRepository;
  let mockRepository: Repository<TestEntity>;
  let mockEventDispatcher: SyncEventDispatcher;
  beforeEach(() => {
    jest.clearAllMocks();

    mockRepository = new MockRepository();
    mockEventDispatcher = new MockSyncEventDispatcher();
    testRepo = new TestRepository(mockRepository, mockEventDispatcher);
  });

  // @ts-ignore
  describe('When creating an entity', () => {
    let testEntity = new TestEntity();

    it('should save de entity in db', async () => {
      await testRepo.save(testEntity);

      expect(mockRepository.save).toBeCalled();
    });

    it('should dispatch events from entity', async () => {
      testEntity.apply(new class implements DomainEvent {}());
      await testRepo.save(testEntity);

      expect(mockEventDispatcher.publish).toBeCalled();
    });
  });

  describe('When getting an entity by id', () => {
    it('should return first by id', async () => {
      const result = await testRepo.findById('someId');

      expect(result).toMatchObject(new TestEntity());
    });
  });

  describe('when adding a where clauses', () => {
    it('should add fields to the query result', () => {
      testRepo.where({ id: 'id' });
      expect(testRepo.wheres).toMatchObject([{ id: 'id' }]);
    });

    it('should return all where in a single object', () => {
      testRepo.where({ id: '' }).where({ test: 'Hola' });
      const test = testRepo.createWhere();
      expect(test).toMatchObject({});
    });

    it('should return entity when doing a first', async () => {
      const testE = await testRepo.first();
      expect(mockRepository.findOne).toBeCalled();
    });

    it('should call find when gettting query result', async () => {
      const testE = await testRepo.get();
      expect(mockRepository.find).toBeCalled();
    });

    it('should return pagination when paginating', async () => {
      const testE = await testRepo.paginate(1, 10);
      expect(mockRepository.find).toBeCalled();
      expect(mockRepository.count).toBeCalled();
    });
  });
});
