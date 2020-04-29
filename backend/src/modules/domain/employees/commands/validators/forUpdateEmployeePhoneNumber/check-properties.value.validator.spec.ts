import { UpdateEmployeePhoneNumber } from '../../update-employee-phone-number.command';
import { CheckUpdatePhoneNumberPropertiesValue } from './check-properties-value.validator';

describe('Update Employee Validator', () => {
  describe('when sending an update phone number employee command', () => {
    it('should pass the validation if the command is correct', async () => {
      // Arrange
      const updateEmployeeValidator = new CheckUpdatePhoneNumberPropertiesValue();
      const params = {
        employeeId: 10,
        phoneNumber: '50494621230',
        };

      // Act
      const updateEmployee = new UpdateEmployeePhoneNumber(params.employeeId, params.phoneNumber);
      const result = await updateEmployeeValidator.validate(updateEmployee);

      // Assert
      expect(result.hasError).toBeFalsy();
      expect(result.errors.length).toBe(0);
    });
  });
});
