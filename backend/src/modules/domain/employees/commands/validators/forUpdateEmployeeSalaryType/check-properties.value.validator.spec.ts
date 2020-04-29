import { UpdateEmployeeSalaryType } from '../../update-employee-salary-type.command';
import { CheckUpdateSalaryTypePropertiesValue } from './check-properties-value.validator';

describe('Update Employee Validator', () => {
  describe('when sending an update salary type employee command', () => {
    it('should pass the validation if the command is correct', async () => {
      // Arrange
      const updateEmployeeValidator = new CheckUpdateSalaryTypePropertiesValue();
      const params = {
        employeeId: 10,
        salaryType: 'Montly',
        };

      // Act
      const updateEmployee = new UpdateEmployeeSalaryType(params.employeeId, params.salaryType);
      const result = await updateEmployeeValidator.validate(updateEmployee);

      // Assert
      expect(result.hasError).toBeFalsy();
      expect(result.errors.length).toBe(0);
    });
  });
});
