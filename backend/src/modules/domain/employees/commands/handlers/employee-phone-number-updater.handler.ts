import { BaseCommandHandler } from '../../../../common/commands';
import { UpdateEmployeePhoneNumber } from '../update-employee-phone-number.command';
import { CommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../../repositories/employees.repository';

@CommandHandler(UpdateEmployeePhoneNumber)
@Injectable()
export class EmployeePhoneNumberUpdater extends BaseCommandHandler<UpdateEmployeePhoneNumber, void> {
  constructor(private readonly employeeRepository: EmployeeRepository) {
    super();
  }
  async handle(command: UpdateEmployeePhoneNumber): Promise<void> {
    const {
      employeeId,
      phoneNumber
    } = command;

    const employee = await this.employeeRepository.findById(employeeId);

    employee.phoneNumber = phoneNumber;

    await this.employeeRepository.save(employee);
  }
}
