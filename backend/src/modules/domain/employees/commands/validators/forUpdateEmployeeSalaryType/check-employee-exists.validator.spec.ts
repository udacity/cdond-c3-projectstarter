import { UpdateEmployeeSalaryType } from '../../update-employee-salary-type.command';
import { EmployeeRepository } from '../../../repositories/employees.repository';
import { CheckEmployeeSalaryTypeExists } from './check-employee-exists.validator';

describe('Check if employee exists', () => {
  const MockEmployeeRepository = jest.fn<EmployeeRepository, []>(
    () =>
      ({
        where: jest.fn().mockReturnValue({
          get: jest.fn().mockResolvedValue([]),
        }),
      } as any),
  );

  describe('when dispatching an update salary type employee command', () => {
    it('should validate that the product exists in the db', async () => {
      // Arrange
      const employeeValidator = new CheckEmployeeSalaryTypeExists(
        new MockEmployeeRepository(),
      );

      const params = {
        employeeId: 100,
        salaryType: 'Montly',
        };

      // Act
      const updateEmployee = new UpdateEmployeeSalaryType(params.employeeId, params.salaryType);
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
