import {
  ICommandValidator,
  IValidationResult,
} from '../../../../../common/commands';
import { EmployeeRepository } from '../../../repositories/employees.repository';
import { Injectable } from '@nestjs/common';
import { ActivateEmployee } from '../../activate-employee.command';

@Injectable()
export class CheckEmployeeExistsOnActivate
  implements ICommandValidator<ActivateEmployee> {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async validate(command: ActivateEmployee): Promise<IValidationResult> {
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
