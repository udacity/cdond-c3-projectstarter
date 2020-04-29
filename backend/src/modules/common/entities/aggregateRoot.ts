import { DomainEvent } from '../events/domainEvent';
import { Exclude } from 'class-transformer';

export interface IAggregateRoot<TId> {
  id: TId;

  apply(event: DomainEvent): void;

  events(): DomainEvent[];

  publish(): DomainEvent[];
}

export abstract class AggregateRoot<TId> implements IAggregateRoot<TId> {
  @Exclude()
  private raisedEvents: DomainEvent[] = [];

  apply(event: DomainEvent) {
    this.raisedEvents.push(event);

    this.rehydrate(event);
  }

  private rehydrate(event: DomainEvent) {
    const handler = this.getEventHandler(event);
    handler && handler.call(this, event);
  }

  events(): DomainEvent[] {
    return this.raisedEvents;
  }

  abstract id: TId;

  private getEventHandler(event: DomainEvent): Function | undefined {
    const handler = `on${this.getEventName(event)}`;
    return this[handler];
  }

  private getEventName(event): string {
    const { constructor } = Object.getPrototypeOf(event);
    return constructor.name as string;
  }

  loadFromHistory(history: DomainEvent[]) {
    history.forEach(event => this.rehydrate(event));
  }

  publish(): DomainEvent[] {
    return this.raisedEvents.splice(0);
  }
}
