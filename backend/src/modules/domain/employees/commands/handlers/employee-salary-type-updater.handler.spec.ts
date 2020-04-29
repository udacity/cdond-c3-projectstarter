import { EmployeeRepository } from '../../repositories/employees.repository';
import { EmployeeSalaryTypeUpdater } from './employee-salary-type-updater.handler';
import { UpdateEmployeeSalaryType } from '../update-employee-salary-type.command';

describe('Employee Salary Type Updater', () => {
  describe('when an user updates an employee salary type', () => {
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
      const handler = new EmployeeSalaryTypeUpdater(employeeRepository);

      const params = {
        employeeId: 100,
        salaryType: 'Montly',
      };

      const updateEmployee = new UpdateEmployeeSalaryType(params.employeeId,params.salaryType);

      // Act
      await handler.handle(updateEmployee);

      // Assert
      expect(employeeRepository.findById).toBeCalledWith(100);
      expect(employeeRepository.save).toBeCalled();
    });
  });
});
