import { UpdateEmployeeAddress } from '../../update-employee-address.command';
import { CheckUpdateAddressPropertiesValue } from './check-properties-value.validator';

describe('Update Employee Validator', () => {
  describe('when sending an update address employee command', () => {
    it('should pass the validation if the command is correct', async () => {
      // Arrange
      const updateEmployeeValidator = new CheckUpdateAddressPropertiesValue();
      const params = {
        employeeId: 100,
        address: 'San Pedro Sula, Calle 1, Casa 5',
        city: 'San Pedro Sula',
        country: 'Honduras',
        region: 'Cortes',
      };

      // Act
      const updateEmployee = new UpdateEmployeeAddress(params.employeeId, params.address,
        params.country, params.region, params.city);
      const result = await updateEmployeeValidator.validate(updateEmployee);

      // Assert
      expect(result.hasError).toBeFalsy();
      expect(result.errors.length).toBe(0);
    });
  });
});
