import { ICommand } from '../../../common/commands';

export class UpdateEmployeeSalary implements ICommand {
  employeeId: number;
  salary: number;

  constructor(employeeId: number, salary: number) {
    this.employeeId = employeeId;
    this.salary = salary;
  }
}
