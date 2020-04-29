import { DomainEvent } from '../../../common/events/domainEvent';

export class EmployeeCreated implements DomainEvent {
  employeeId: number;
  firstName: string;
  constructor(employeeId: number, firstName: string) {
    this.employeeId = employeeId;
    this.firstName = firstName;
  }
}
