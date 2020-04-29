import { EventBus } from '@nestjs/cqrs';
import { DomainEvent } from './domainEvent';

import { IEventDispatcher } from './eventDispatcher';
import { ModuleRef } from '@nestjs/core';
import { Injectable, Type } from '@nestjs/common';
import { IEventHandler } from './eventHandler';

export type EventHandlerMetatype = Type<IEventHandler<DomainEvent>>;

@Injectable()
export class SyncEventDispatcher implements IEventDispatcher {
  constructor(private eventBus: EventBus) {}
  publish<TEvent extends DomainEvent>(event: TEvent): Promise<void> {
    this.eventBus.publish(event);
    const eb = this.eventBus;
    return new Promise(resolve => {
      eb.publish(event);
    });
  }

  register(handlers: EventHandlerMetatype[]) {
    this.eventBus.register(handlers);
  }
}
