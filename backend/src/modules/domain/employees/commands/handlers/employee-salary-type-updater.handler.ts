import { BaseCommandHandler } from '../../../../common/commands';
import { UpdateEmployeeSalaryType } from '../update-employee-salary-type.command';
import { CommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../../repositories/employees.repository';
import { SalaryType } from '../../entities/employee.entity';

@CommandHandler(UpdateEmployeeSalaryType)
@Injectable()
export class EmployeeSalaryTypeUpdater extends BaseCommandHandler<UpdateEmployeeSalaryType, void> {
  constructor(private readonly employeeRepository: EmployeeRepository) {
    super();
  }
  async handle(command: UpdateEmployeeSalaryType): Promise<void> {
    const {
      employeeId,
      salaryType
    } = command;
    const salaryTypeKey = Object.keys(SalaryType).find(
        key => SalaryType[key] === salaryType,
      );
    const employee = await this.employeeRepository.findById(employeeId);

    employee.salaryType = SalaryType[salaryTypeKey];

    await this.employeeRepository.save(employee);
  }
}
