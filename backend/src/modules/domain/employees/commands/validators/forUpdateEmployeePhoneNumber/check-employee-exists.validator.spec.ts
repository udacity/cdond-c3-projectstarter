import { UpdateEmployeePhoneNumber } from '../../update-employee-phone-number.command';
import { EmployeeRepository } from '../../../repositories/employees.repository';
import { CheckEmployeePhoneNumberExists } from './check-employee-exists.validator';

describe('Check if employee exists', () => {
  const MockEmployeeRepository = jest.fn<EmployeeRepository, []>(
    () =>
      ({
        where: jest.fn().mockReturnValue({
          get: jest.fn().mockResolvedValue([]),
        }),
      } as any),
  );

  describe('when dispatching an update phone number employee command', () => {
    it('should validate that the product exists in the db', async () => {
      // Arrange
      const employeeValidator = new CheckEmployeePhoneNumberExists(
        new MockEmployeeRepository(),
      );

      const params = {
        employeeId: 100,
        phoneNumber: '50494621230',
      };

      // Act
      const updateEmployee = new UpdateEmployeePhoneNumber(params.employeeId, params.phoneNumber);
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
