import { ICommand } from '../../../common/commands';

export class UpdateEmployeeTags implements ICommand {
  employeeId: number;
  tags: string;

  constructor(employeeId: number, tags: string) {
    this.employeeId = employeeId;
    this.tags = tags;
  }
}
