import { ActivateEmployee } from '../activate-employee.command';
import { BaseCommandHandler } from '../../../../common/commands';
import { CommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../../repositories/employees.repository';

@CommandHandler(ActivateEmployee)
@Injectable()
export class EmployeeActivator extends BaseCommandHandler<ActivateEmployee, void> {
  constructor(private readonly employeeRepository: EmployeeRepository) {
    super();
  }

  async handle(command: ActivateEmployee): Promise<void> {
    const { employeeId, isActive } = command;
    const employee = await this.employeeRepository.findById(employeeId);
    employee.isActive = isActive;

    await this.employeeRepository.save(employee);
  }
}
