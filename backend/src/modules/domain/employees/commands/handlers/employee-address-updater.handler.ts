import { BaseCommandHandler } from '../../../../common/commands';
import { UpdateEmployeeAddress } from '../update-employee-address.command';
import { CommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../../repositories/employees.repository';

@CommandHandler(UpdateEmployeeAddress)
@Injectable()
export class EmployeeAddressUpdater extends BaseCommandHandler<UpdateEmployeeAddress, void> {
  constructor(private readonly employeeRepository: EmployeeRepository) {
    super();
  }
  async handle(command: UpdateEmployeeAddress): Promise<void> {
    const {
      employeeId,
      address,
      country,
      region,
      city
    } = command;

    const employee = await this.employeeRepository.findById(employeeId);

    employee.address = address;
    employee.country = country;
    employee.region = region;
    employee.city = city;

    await this.employeeRepository.save(employee);
  }
}
