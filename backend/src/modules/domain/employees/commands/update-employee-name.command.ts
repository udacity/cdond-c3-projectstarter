import { ICommand } from '../../../common/commands';

export class UpdateEmployeeName implements ICommand {
  employeeId: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  secondLastName: string;


  constructor(employeeId: number, firstName: string, middleName: string, lastName: string, secondLastName: string ) {
    this.employeeId = employeeId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.secondLastName = secondLastName;
  }
}
