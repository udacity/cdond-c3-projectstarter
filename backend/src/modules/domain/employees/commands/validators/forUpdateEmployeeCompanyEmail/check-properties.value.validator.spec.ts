import { UpdateEmployeeCompanyEmail } from '../../update-employee-company-email.command';
import { CheckUpdateCompanyEmailPropertiesValue } from './check-properties-value.validator';

describe('Update Employee Validator', () => {
  describe('when sending an update company email employee command', () => {
    it('should pass the validation if the command is correct', async () => {
      // Arrange
      const updateEmployeeValidator = new CheckUpdateCompanyEmailPropertiesValue();
      const params = {
        employeeId: 10,
        companyEmail: 'jimmyramos@acklenavenue.com',
      };

      // Act
      const updateEmployee = new UpdateEmployeeCompanyEmail(params.employeeId, params.companyEmail);
      const result = await updateEmployeeValidator.validate(updateEmployee);

      // Assert
      expect(result.hasError).toBeFalsy();
      expect(result.errors.length).toBe(0);
    });
  });
});
