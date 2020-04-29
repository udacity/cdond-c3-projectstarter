import { BaseCommandHandler } from '../../../../common/commands';
import { UpdateEmployeePersonalEmail } from '../update-employee-personal-email.command';
import { CommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../../repositories/employees.repository';

@CommandHandler(UpdateEmployeePersonalEmail)
@Injectable()
export class EmployeePersonalEmailUpdater extends BaseCommandHandler<UpdateEmployeePersonalEmail, void> {
  constructor(private readonly employeeRepository: EmployeeRepository) {
    super();
  }
  async handle(command: UpdateEmployeePersonalEmail): Promise<void> {
    const {
      employeeId,
      personalEmail
    } = command;

    const employee = await this.employeeRepository.findById(employeeId);

    employee.personalEmail = personalEmail;

    await this.employeeRepository.save(employee);
  }
}
