import { ICommand } from '../../../common/commands';

export class UpdateEmployeeBirthdate implements ICommand {
  employeeId: number;
  birthdate: Date;

  constructor(employeeId: number, birthdate: Date) {
    this.employeeId = employeeId;
    this.birthdate = birthdate;
  }
}
