import { ICommand } from '../../../common/commands';

export class UpdateEmployeeEffectiveDate implements ICommand {
  employeeId: number;
  effectiveDate: string;

  constructor(employeeId: number, effectiveDate: string) {
    this.employeeId = employeeId;
    this.effectiveDate = effectiveDate;
  }
}
