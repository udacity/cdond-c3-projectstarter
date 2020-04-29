import { UpdateEmployeeBirthdate } from '../../update-employee-birthdate.command';
import { CheckUpdateBirthDatePropertiesValue } from './check-properties-value.validator';

describe('Update Employee Validator', () => {
  describe('when sending an update birthdate employee command', () => {
    it('should pass the validation if the command is correct', async () => {
      // Arrange
      const updateEmployeeValidator = new CheckUpdateBirthDatePropertiesValue();
      const params = {
        employeeId: 10,
        birthdate: '2008-09-15T15:53:00',
      };

      // Act
      const updateEmployee = new UpdateEmployeeBirthdate(params.employeeId, params.birthdate);
      const result = await updateEmployeeValidator.validate(updateEmployee);

      // Assert
      expect(result.hasError).toBeFalsy();
      expect(result.errors.length).toBe(0);
    });
  });
});
