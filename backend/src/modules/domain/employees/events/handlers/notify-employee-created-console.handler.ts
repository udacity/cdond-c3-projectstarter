import { IEventHandler } from '../../../../common/events';
import { EventsHandler } from '@nestjs/cqrs';
import { EmployeeCreated } from '../employee-created.event';

@EventsHandler(EmployeeCreated)
export class NotifyEmployeeCreatedConsole
  implements IEventHandler<EmployeeCreated> {
  handle(event: EmployeeCreated): any {
    console.log('Employee created');
  }
}
