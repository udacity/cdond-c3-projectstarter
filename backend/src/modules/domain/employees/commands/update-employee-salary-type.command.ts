import { ICommand } from '../../../common/commands';

export class UpdateEmployeeSalaryType implements ICommand {
  employeeId: number;
  salaryType: string;

  constructor(employeeId: number, salaryType: string) {
    this.employeeId = employeeId;
    this.salaryType = salaryType;
  }
}
