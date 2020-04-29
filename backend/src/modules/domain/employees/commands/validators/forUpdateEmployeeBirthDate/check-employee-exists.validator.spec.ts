import { UpdateEmployeeBirthdate } from '../../update-employee-birthdate.command';
import { EmployeeRepository } from '../../../repositories/employees.repository';
import { CheckEmployeeBirthDateExists } from './check-employee-exists.validator';

describe('Check if employee exists', () => {
  const MockEmployeeRepository = jest.fn<EmployeeRepository, []>(
    () =>
      ({
        where: jest.fn().mockReturnValue({
          get: jest.fn().mockResolvedValue([]),
        }),
      } as any),
  );

  describe('when dispatching an update birthdate employee command', () => {
    it('should validate that the product exists in the db', async () => {
      // Arrange
      const employeeValidator = new CheckEmployeeBirthDateExists(
        new MockEmployeeRepository(),
      );

      const params = {
        employeeId: 100,
        birthdate: '2008-09-15T15:53:00'
      };

      // Act
      const updateEmployee = new UpdateEmployeeBirthdate(params.employeeId, params.birthdate);
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
