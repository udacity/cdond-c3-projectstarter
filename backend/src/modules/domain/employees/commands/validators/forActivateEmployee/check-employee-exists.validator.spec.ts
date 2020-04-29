import { ActivateEmployee } from '../../activate-employee.command';
import { EmployeeRepository } from '../../../repositories/employees.repository';
import { CheckEmployeeExistsOnActivate } from './check-employee-exists.validator';

describe('Check if employee exists', () => {
  const MockEmployeeRepository = jest.fn<EmployeeRepository, []>(
    () =>
      ({
        where: jest.fn().mockReturnValue({
          get: jest.fn().mockResolvedValue([]),
        }),
      } as any),
  );

  describe('when dispatching an update employee command', () => {
    it('should validate that the product exists in the db', async () => {
      // Arrange
      const employeeValidator = new CheckEmployeeExistsOnActivate(
        new MockEmployeeRepository(),
      );

      const params = {
        employeeId: 100,
        isActive: false
      };

      // Act
      const activateEmployee = new ActivateEmployee(params.employeeId, params.isActive);
      const result = await employeeValidator.validate(activateEmployee);

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
