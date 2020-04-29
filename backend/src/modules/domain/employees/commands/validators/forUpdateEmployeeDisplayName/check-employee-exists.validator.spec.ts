import { UpdateEmployeeDisplayName } from '../../update-employee-display-name.command';
import { EmployeeRepository } from '../../../repositories/employees.repository';
import { CheckEmployeeDisplayNameExists } from './check-employee-exists.validator';

describe('Check if employee exists', () => {
  const MockEmployeeRepository = jest.fn<EmployeeRepository, []>(
    () =>
      ({
        where: jest.fn().mockReturnValue({
          get: jest.fn().mockResolvedValue([]),
        }),
      } as any),
  );

  describe('when dispatching an update display name employee command', () => {
    it('should validate that the product exists in the db', async () => {
      // Arrange
      const employeeValidator = new CheckEmployeeDisplayNameExists(
        new MockEmployeeRepository(),
      );

      const params = {
        employeeId: 100,
        displayName: 'Test display'
      };

      // Act
      const updateEmployee = new UpdateEmployeeDisplayName(params.employeeId, params.displayName);
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
