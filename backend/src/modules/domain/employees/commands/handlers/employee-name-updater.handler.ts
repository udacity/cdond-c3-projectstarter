import * as moment from 'moment-timezone';
import { BaseCommandHandler } from '../../../../common/commands';
import { UpdateEmployeeName } from '../update-employee-name.command';
import { CommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../../repositories/employees.repository';
import { SalaryType } from '../../entities/employee.entity';

@CommandHandler(UpdateEmployeeName)
@Injectable()
export class EmployeeNameUpdater extends BaseCommandHandler<UpdateEmployeeName, void> {
  constructor(private readonly employeeRepository: EmployeeRepository) {
    super();
  }
  async handle(command: UpdateEmployeeName): Promise<void> {
    const {
      employeeId,
      firstName,
      middleName,
      lastName,
      secondLastName
    } = command;

    const employee = await this.employeeRepository.findById(employeeId);

    employee.firstName = firstName;
    employee.middleName = middleName;
    employee.lastName = lastName;
    employee.secondLastName = secondLastName;

    await this.employeeRepository.save(employee);
  }
}
