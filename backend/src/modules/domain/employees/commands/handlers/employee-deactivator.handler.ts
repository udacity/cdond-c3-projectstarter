import { DeactivateEmployee } from '../deactivate-employee.command';
import { BaseCommandHandler } from '../../../../common/commands';
import { CommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../../repositories/employees.repository';

@CommandHandler(DeactivateEmployee)
@Injectable()
export class EmployeeDeactivator extends BaseCommandHandler<DeactivateEmployee, void> {
  constructor(private readonly employeeRepository: EmployeeRepository) {
    super();
  }

  async handle(command: DeactivateEmployee): Promise<void> {
    const { employeeId, isActive } = command;
    const employee = await this.employeeRepository.findById(employeeId);
    employee.isActive = isActive;

    await this.employeeRepository.save(employee);
  }
}
