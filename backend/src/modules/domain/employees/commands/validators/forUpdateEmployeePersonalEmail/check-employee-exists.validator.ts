import {
  ICommandValidator,
  IValidationResult,
} from '../../../../../common/commands';
import { UpdateEmployeePersonalEmail } from '../../update-employee-personal-email.command';
import { EmployeeRepository } from '../../../repositories/employees.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckEmployeePersonalEmailExists implements ICommandValidator<UpdateEmployeePersonalEmail> {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async validate(command: UpdateEmployeePersonalEmail): Promise<IValidationResult> {
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
