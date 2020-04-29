import { UpdateEmployeeName } from '../../update-employee-name.command';
import { EmployeeRepository } from '../../../repositories/employees.repository';
import { CheckEmployeeNameExists } from './check-employee-exists.validator';

describe('Check if employee exists', () => {
  const MockEmployeeRepository = jest.fn<EmployeeRepository, []>(
    () =>
      ({
        where: jest.fn().mockReturnValue({
          get: jest.fn().mockResolvedValue([]),
        }),
      } as any),
  );

  describe('when dispatching an update name employee command', () => {
    it('should validate that the product exists in the db', async () => {
      // Arrange
      const employeeValidator = new CheckEmployeeNameExists(
        new MockEmployeeRepository(),
      );

      const params = {
        employeeId: 100,
        firstName: 'Jimmy',
        lastName: 'Ramos',
        secondLastName: 'Banegas',
        middleName: 'test',
      };

      // Act
      const updateEmployee = new UpdateEmployeeName(params.employeeId, params.firstName, params.middleName,
        params.lastName, params.secondLastName);
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
