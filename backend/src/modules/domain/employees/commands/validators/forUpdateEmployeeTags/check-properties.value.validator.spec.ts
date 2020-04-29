import { UpdateEmployeeTags } from '../../update-employee-tags.command';
import { CheckUpdateTagsPropertiesValue } from './check-properties-value.validator';

describe('Update Employee Validator', () => {
  describe('when sending an update employee command', () => {
    it('should pass the validation if the command is correct', async () => {
      // Arrange
      const updateEmployeeValidator = new CheckUpdateTagsPropertiesValue();
      const params = {
        employeeId: 10,
        tags: 'Developer',
        };

      // Act
      const updateEmployee = new UpdateEmployeeTags(params.employeeId, params.tags);
      const result = await updateEmployeeValidator.validate(updateEmployee);

      // Assert
      expect(result.hasError).toBeFalsy();
      expect(result.errors.length).toBe(0);
    });
  });
});
