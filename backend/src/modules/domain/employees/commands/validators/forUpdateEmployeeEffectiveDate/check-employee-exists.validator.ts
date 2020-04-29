import {
  ICommandValidator,
  IValidationResult,
} from '../../../../../common/commands';
import { UpdateEmployeeEffectiveDate } from '../../update-employee-effective-date.command';
import { EmployeeRepository } from '../../../repositories/employees.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckEmployeeEffectiveDateExists implements ICommandValidator<UpdateEmployeeEffectiveDate> {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async validate(command: UpdateEmployeeEffectiveDate): Promise<IValidationResult> {
    const queryResult = await this.employeeRepository
      .where({ id: command.employeeId })
      .get();
    if (queryResult.length > 0) {
      return {
        hasError: false,
        errors: [],
      };
    }
    return {
      hasError: true,
      errors: [
        {
          field: 'employeeId',
          fieldLabel: 'employeeId',
          message: 'The employee does not exist',
          value: command.employeeId,
        },
      ],
    };
  }
}
