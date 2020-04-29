import { ICommand } from '../../../common/commands';

export class DeactivateEmployee implements ICommand {
  employeeId: number;
  isActive: boolean;

  constructor(employeeId: number, isActive: boolean) {
    this.employeeId = employeeId;
    this.isActive = isActive;
  }
}
