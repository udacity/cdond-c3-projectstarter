import { BaseCommandHandler } from '../../../../common/commands';
import { UpdateEmployeeSalary } from '../update-employee-salary.command';
import { CommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../../repositories/employees.repository';

@CommandHandler(UpdateEmployeeSalary)
@Injectable()
export class EmployeeSalaryUpdater extends BaseCommandHandler<UpdateEmployeeSalary, void> {
  constructor(private readonly employeeRepository: EmployeeRepository) {
    super();
  }
  async handle(command: UpdateEmployeeSalary): Promise<void> {
    const {
      employeeId,
      salary
    } = command;

    const employee = await this.employeeRepository.findById(employeeId);

    employee.salary = salary;

    await this.employeeRepository.save(employee);
  }
}
