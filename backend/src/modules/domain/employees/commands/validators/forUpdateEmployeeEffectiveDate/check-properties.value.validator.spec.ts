import { UpdateEmployeeEffectiveDate } from '../../update-employee-effective-date.command';
import { CheckUpdateEffectiveDatePropertiesValue } from './check-properties-value.validator';

describe('Update Employee Validator', () => {
  describe('when sending an update effective date employee command', () => {
    it('should pass the validation if the command is correct', async () => {
      // Arrange
      const updateEmployeeValidator = new CheckUpdateEffectiveDatePropertiesValue();
      const params = {
        employeeId: 10,
        effectiveDate: '2008-09-15T15:53:00',
        };

      // Act
      const updateEmployee = new UpdateEmployeeEffectiveDate(params.employeeId, params.effectiveDate);
      const result = await updateEmployeeValidator.validate(updateEmployee);

      // Assert
      expect(result.hasError).toBeFalsy();
      expect(result.errors.length).toBe(0);
    });
  });
});
