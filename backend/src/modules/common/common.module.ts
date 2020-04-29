import { Module, OnModuleInit } from '@nestjs/common';
import { SyncCommandDispatcher } from './commands';
import { SyncEventDispatcher } from './events';
import { CqrsModule } from '@nestjs/cqrs';
import { ValidationExplorer } from './commands/validation/validationExplorer';

@Module({
  imports: [CqrsModule],
  providers: [SyncCommandDispatcher, SyncEventDispatcher, ValidationExplorer],
  exports: [SyncCommandDispatcher, SyncEventDispatcher],
})
export class CommonModule implements OnModuleInit {
  constructor() {}

  onModuleInit() {}
}
