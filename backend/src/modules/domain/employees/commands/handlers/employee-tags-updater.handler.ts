import { BaseCommandHandler } from '../../../../common/commands';
import { UpdateEmployeeTags } from '../update-employee-tags.command';
import { CommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../../repositories/employees.repository';

@CommandHandler(UpdateEmployeeTags)
@Injectable()
export class EmployeeTagsUpdater extends BaseCommandHandler<UpdateEmployeeTags, void> {
  constructor(private readonly employeeRepository: EmployeeRepository) {
    super();
  }
  async handle(command: UpdateEmployeeTags): Promise<void> {
    const {
      employeeId,
      tags
    } = command;

    const employee = await this.employeeRepository.findById(employeeId);

    employee.tags = tags;

    await this.employeeRepository.save(employee);
  }
}
