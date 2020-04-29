import { AggregateRoot } from './aggregateRoot';
import { DomainEvent } from '../events/domainEvent';

class TestAggregate extends AggregateRoot<number> {
  constructor(params: { id: number } = {} as TestAggregate) {
    super();
    let { id } = params;
    this.id = id;
  }
  id: number;
  tesName: string;
  changeName(newName: string) {
    this.apply(new TestNameChange(this.id, newName));
  }
  onTestNameChange(testNameChange: TestNameChange) {
    this.tesName = testNameChange.newName;
  }
}

class TestNameChange implements DomainEvent {
  testId: number;
  newName: string;

  constructor(testId: number, newName: string) {
    this.testId = testId;
    this.newName = newName;
  }
}

describe('AggregateRoot', () => {
  describe('When applying an event', () => {
    const testAggregate = new TestAggregate({ id: 1 });

    testAggregate.changeName('new Name');

    it('should add the event to the raised events', () => {
      expect(testAggregate.events()).toMatchObject([
        new TestNameChange(1, 'new Name'),
      ]);
    });

    it('should call event handler on entity by the event like `on{NameOfTheEvent}`', () => {
      expect(testAggregate.tesName);
    });
  });

  describe('when loading events from history', () => {
    const testAggregate = new TestAggregate();

    testAggregate.loadFromHistory([new TestNameChange(1, 'other Name')]);

    it('should update the new values from history ', () => {
      expect(testAggregate.tesName).toEqual('other Name');
    });

    it('should not add the events to the raised events', () => {
      expect(testAggregate.events().length).toEqual(0);
    });
  });

  describe('when publishing the events', () => {
    const testAggregate = new TestAggregate({ id: 1 });

    testAggregate.changeName('new Name');

    const published = testAggregate.publish();
    it('should get all raised events', () => {
      expect(published).toMatchObject([new TestNameChange(1, 'new Name')]);
    });

    it('it should clean the event stream', () => {
      expect(testAggregate.events().length).toEqual(0);
    });
  });
});
