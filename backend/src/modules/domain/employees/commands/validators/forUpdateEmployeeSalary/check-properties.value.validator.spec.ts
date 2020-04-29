import { UpdateEmployeeSalary } from '../../update-employee-salary.command';
import { CheckUpdateSalaryPropertiesValue } from './check-properties-value.validator';

describe('Update Employee Validator', () => {
  describe('when sending an update salary employee command', () => {
    it('should pass the validation if the command is correct', async () => {
      // Arrange
      const updateEmployeeValidator = new CheckUpdateSalaryPropertiesValue();
      const params = {
        employeeId: 10,
        salary: 10
      };

      // Act
      const updateEmployee = new UpdateEmployeeSalary(params.employeeId, params.salary);
      const result = await updateEmployeeValidator.validate(updateEmployee);

      // Assert
      expect(result.hasError).toBeFalsy();
      expect(result.errors.length).toBe(0);
    });
  });
});
