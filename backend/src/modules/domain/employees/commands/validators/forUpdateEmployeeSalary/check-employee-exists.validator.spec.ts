import { UpdateEmployeeSalary } from '../../update-employee-salary.command'
import { EmployeeRepository } from '../../../repositories/employees.repository';
import { CheckEmployeeSalaryExists } from './check-employee-exists.validator';

describe('Check if employee exists', () => {
  const MockEmployeeRepository = jest.fn<EmployeeRepository, []>(
    () =>
      ({
        where: jest.fn().mockReturnValue({
          get: jest.fn().mockResolvedValue([]),
        }),
      } as any),
  );

  describe('when dispatching an update salary employee command', () => {
    it('should validate that the product exists in the db', async () => {
      // Arrange
      const employeeValidator = new CheckEmployeeSalaryExists(
        new MockEmployeeRepository(),
      );

      const params = {
        employeeId: 100,
        salary: 10,
      };

      // Act
      const updateEmployee = new UpdateEmployeeSalary(params.employeeId, params.salary);
      const result = await employeeValidator.validate(updateEmployee);

      // Assert
      expect(result.hasError).toBeTruthy();
      expect(result.errors).toMatchObject([
        {
          field: 'employeeId',
          fieldLabel: 'employeeId',
          message: 'The employee does not exist',
          value: 100,
        },
      ]);
    });
  });
});
