import { BaseCommandHandler } from '../../../../common/commands';
import { UpdateEmployeeDisplayName } from '../update-employee-display-name.command';
import { CommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../../repositories/employees.repository';

@CommandHandler(UpdateEmployeeDisplayName)
@Injectable()
export class EmployeeDisplayNameUpdater extends BaseCommandHandler<UpdateEmployeeDisplayName, void> {
  constructor(private readonly employeeRepository: EmployeeRepository) {
    super();
  }
  async handle(command: UpdateEmployeeDisplayName): Promise<void> {
    const {
      employeeId,
      displayName
    } = command;

    const employee = await this.employeeRepository.findById(employeeId);

    employee.displayName = displayName;

    await this.employeeRepository.save(employee);
  }
}
