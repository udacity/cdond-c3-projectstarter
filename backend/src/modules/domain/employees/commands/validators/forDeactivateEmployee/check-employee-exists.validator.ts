import {
  ICommandValidator,
  IValidationResult,
} from '../../../../../common/commands';
import { EmployeeRepository } from '../../../repositories/employees.repository';
import { Injectable } from '@nestjs/common';
import { DeactivateEmployee } from '../../deactivate-employee.command';

@Injectable()
export class CheckEmployeeExistsOnDeactivate
  implements ICommandValidator<DeactivateEmployee> {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async validate(command: DeactivateEmployee): Promise<IValidationResult> {
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
