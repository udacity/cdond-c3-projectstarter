import { UpdateEmployeeName } from '../../update-employee-name.command';
import { CheckUpdateNamePropertiesValue } from './check-properties-value.validator';

describe('Update Employee Validator', () => {
  describe('when sending an update name mployee command', () => {
    it('should pass the validation if the command is correct', async () => {
      // Arrange
      const updateEmployeeValidator = new CheckUpdateNamePropertiesValue();
      const params = {
        employeeId: 10,
        firstName: 'Jimmy',
        lastName: 'Ramos',
        secondLastName: 'Banegas',
        middleName: 'test',
      };

      // Act
      const updateEmployee = new UpdateEmployeeName(params.employeeId, params.firstName, params.middleName,
        params.lastName, params.secondLastName);
      const result = await updateEmployeeValidator.validate(updateEmployee);

      // Assert
      expect(result.hasError).toBeFalsy();
      expect(result.errors.length).toBe(0);
    });
  });
});
