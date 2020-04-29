import { EmployeeRepository } from '../../repositories/employees.repository';
import { EmployeeSalaryUpdater } from './employee-salary-updater.handler';
import { UpdateEmployeeSalary } from '../update-employee-salary.command';

describe('Employee Salary Updater', () => {
  describe('when an user updates an employee salary', () => {
    const MockEmployeeRepository = jest.fn<EmployeeRepository, []>(
      () =>
        ({
          save: jest.fn(),
          findById: jest.fn().mockResolvedValue([]),
        } as any),
    );

    const employeeRepository = new MockEmployeeRepository();

    it('should get and employee and add it to the repository', async () => {
      // Arrange
      const handler = new EmployeeSalaryUpdater(employeeRepository);

      const params = {
        employeeId: 100,
        salary: 10
      };

      const updateEmployee = new UpdateEmployeeSalary(params.employeeId, params.salary);

      // Act
      await handler.handle(updateEmployee);

      // Assert
      expect(employeeRepository.findById).toBeCalledWith(100);
      expect(employeeRepository.save).toBeCalled();
    });
  });
});
