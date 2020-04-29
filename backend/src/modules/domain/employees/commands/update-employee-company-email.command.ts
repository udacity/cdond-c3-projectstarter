import { ICommand } from '../../../common/commands';

export class UpdateEmployeeCompanyEmail implements ICommand {
  employeeId: number;
  companyEmail: string;

  constructor(employeeId: number, companyEmail: string) {
    this.employeeId = employeeId;
    this.companyEmail = companyEmail;
  }
}
