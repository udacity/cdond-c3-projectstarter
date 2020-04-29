import { IEventHandler as EventHandler } from '@nestjs/cqrs';
import { DomainEvent } from './domainEvent';

export interface IEventHandler<TEvent extends DomainEvent>
  extends EventHandler<TEvent> {}
