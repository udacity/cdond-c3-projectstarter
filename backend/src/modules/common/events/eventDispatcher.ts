import { DomainEvent } from './domainEvent';

export interface IEventDispatcher {
  publish<TEvent extends DomainEvent>(event: TEvent): Promise<void>;
}
