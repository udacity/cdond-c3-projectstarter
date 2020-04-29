import { ICommand } from '../../../common/commands';

export class UpdateEmployeeBirthdate implements ICommand {
  employeeId: number;
  birthdate: string;

  constructor(employeeId: number, birthdate: string) {
    this.employeeId = employeeId;
    this.birthdate = birthdate;
  }
}
