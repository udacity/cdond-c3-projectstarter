import { UpdateEmployeeDisplayName } from '../../update-employee-display-name.command';
import { CheckUpdateDisplayNamePropertiesValue } from './check-properties-value.validator';

describe('Update Employee Validator', () => {
  describe('when sending an update display name employee command', () => {
    it('should pass the validation if the command is correct', async () => {
      // Arrange
      const updateEmployeeValidator = new CheckUpdateDisplayNamePropertiesValue();
      const params = {
        employeeId: 10,
        displayName: 'Test display',
        };

      // Act
      const updateEmployee = new UpdateEmployeeDisplayName(params.employeeId, params.displayName);
      const result = await updateEmployeeValidator.validate(updateEmployee);

      // Assert
      expect(result.hasError).toBeFalsy();
      expect(result.errors.length).toBe(0);
    });
  });
});
