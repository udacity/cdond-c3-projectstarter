import { UpdateEmployeePersonalEmail } from '../../update-employee-personal-email.command';
import { EmployeeRepository } from '../../../repositories/employees.repository';
import { CheckEmployeePersonalEmailExists } from './check-employee-exists.validator';

describe('Check if employee exists', () => {
  const MockEmployeeRepository = jest.fn<EmployeeRepository, []>(
    () =>
      ({
        where: jest.fn().mockReturnValue({
          get: jest.fn().mockResolvedValue([]),
        }),
      } as any),
  );

  describe('when dispatching an update personal email employee command', () => {
    it('should validate that the product exists in the db', async () => {
      // Arrange
      const employeeValidator = new CheckEmployeePersonalEmailExists(
        new MockEmployeeRepository(),
      );

      const params = {
        employeeId: 100,
        personalEmail: 'jimmybanegas93@gmail.com',
      };

      // Act
      const updateEmployee = new UpdateEmployeePersonalEmail(params.employeeId, params.personalEmail);
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
