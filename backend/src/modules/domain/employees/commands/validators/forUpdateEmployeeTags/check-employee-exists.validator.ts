import {
  ICommandValidator,
  IValidationResult,
} from '../../../../../common/commands';
import { UpdateEmployeeTags } from '../../update-employee-tags.command';
import { EmployeeRepository } from '../../../repositories/employees.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckEmployeeTagsExists implements ICommandValidator<UpdateEmployeeTags> {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async validate(command: UpdateEmployeeTags): Promise<IValidationResult> {
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
