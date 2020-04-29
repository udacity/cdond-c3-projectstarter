import { ICommand } from '../../../common/commands';

export class UpdateEmployeePhoneNumber implements ICommand {
  employeeId: number;
  phoneNumber: string;

  constructor(employeeId: number, phoneNumber: string) {
    this.employeeId = employeeId;
    this.phoneNumber = phoneNumber;
  }
}
