import { ICommand } from '../../../common/commands';

export class UpdateEmployeeDisplayName implements ICommand {
  employeeId: number;
  displayName: string;

  constructor(employeeId: number, displayName: string) {
    this.employeeId = employeeId;
    this.displayName = displayName;
  }
}
