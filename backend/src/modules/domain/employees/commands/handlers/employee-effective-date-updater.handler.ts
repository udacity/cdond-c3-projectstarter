import * as moment from 'moment-timezone';
import { BaseCommandHandler } from '../../../../common/commands';
import { UpdateEmployeeEffectiveDate } from '../update-employee-effective-date.command';
import { CommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../../repositories/employees.repository';

@CommandHandler(UpdateEmployeeEffectiveDate)
@Injectable()
export class EmployeeEffectiveDateUpdater extends BaseCommandHandler<UpdateEmployeeEffectiveDate, void> {
  constructor(private readonly employeeRepository: EmployeeRepository) {
    super();
  }
  async handle(command: UpdateEmployeeEffectiveDate): Promise<void> {
    const {
      employeeId,
      effectiveDate
    } = command;

    const employee = await this.employeeRepository.findById(employeeId);

    employee.effectiveDate = moment(effectiveDate)
    .utc()
    .format();

    await this.employeeRepository.save(employee);
  }
}
