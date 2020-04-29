import { BaseCommandHandler } from '../../../../common/commands';
import { UpdateEmployeeCompanyEmail } from '../update-employee-company-email.command';
import { CommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../../repositories/employees.repository';

@CommandHandler(UpdateEmployeeCompanyEmail)
@Injectable()
export class EmployeeCompanyEmailUpdater extends BaseCommandHandler<UpdateEmployeeCompanyEmail, void> {
  constructor(private readonly employeeRepository: EmployeeRepository) {
    super();
  }
  async handle(command: UpdateEmployeeCompanyEmail): Promise<void> {
    const {
      employeeId,
      companyEmail
    } = command;

    const employee = await this.employeeRepository.findById(employeeId);

    employee.companyEmail = companyEmail;

    await this.employeeRepository.save(employee);
  }
}
