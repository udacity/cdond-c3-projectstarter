import { UpdateEmployeePersonalEmail } from '../../update-employee-personal-email.command';
import { CheckUpdatePersonalEmailPropertiesValue } from './check-properties-value.validator';

describe('Update Employee Validator', () => {
  describe('when sending an update personal email employee command', () => {
    it('should pass the validation if the command is correct', async () => {
      // Arrange
      const updateEmployeeValidator = new CheckUpdatePersonalEmailPropertiesValue();
      const params = {
        employeeId: 10,
        personalEmail: 'jimmybanegas93@gmail.com',
        };

      // Act
      const updateEmployee = new UpdateEmployeePersonalEmail(params.employeeId, params.personalEmail);
      const result = await updateEmployeeValidator.validate(updateEmployee);

      // Assert
      expect(result.hasError).toBeFalsy();
      expect(result.errors.length).toBe(0);
    });
  });
});
