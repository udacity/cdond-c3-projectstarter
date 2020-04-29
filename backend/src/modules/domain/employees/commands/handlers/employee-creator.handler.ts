import { BaseCommandHandler } from '../../../../common/commands';
import { CreateEmployee } from '../create-employee.command';
import { EmployeeRepository } from '../../repositories/employees.repository';
import { Employee } from '../../entities/employee.entity';
import { CommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

@CommandHandler(CreateEmployee)
@Injectable()
export class EmployeeCreator extends BaseCommandHandler<CreateEmployee, Employee> {
  constructor(private readonly employeeRepository: EmployeeRepository) {
    super();
  }
  async handle(command: CreateEmployee): Promise<Employee> {
    
    const employee = new Employee(command);
    return await this.employeeRepository.save(employee);
  }
}
