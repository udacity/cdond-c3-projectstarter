import {
  ICommandValidator,
  IValidationResult,
} from '../../../../../common/commands';
import { UpdateEmployeeAddress } from '../../update-employee-address.command';
import { EmployeeRepository } from '../../../repositories/employees.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckEmployeeAddressExists implements ICommandValidator<UpdateEmployeeAddress> {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async validate(command: UpdateEmployeeAddress): Promise<IValidationResult> {
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
