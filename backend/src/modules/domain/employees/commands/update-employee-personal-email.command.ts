import { ICommand } from '../../../common/commands';

export class UpdateEmployeePersonalEmail implements ICommand {
  employeeId: number;
  personalEmail: string;

  constructor(employeeId: number, personalEmail: string) {
    this.employeeId = employeeId;
    this.personalEmail = personalEmail;
  }
}
