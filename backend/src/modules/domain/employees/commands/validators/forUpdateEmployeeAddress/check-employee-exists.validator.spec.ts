import { UpdateEmployeeAddress } from '../../update-employee-address.command';
import { EmployeeRepository } from '../../../repositories/employees.repository';
import { CheckEmployeeAddressExists } from './check-employee-exists.validator';

describe('Check if employee exists', () => {
  const MockEmployeeRepository = jest.fn<EmployeeRepository, []>(
    () =>
      ({
        where: jest.fn().mockReturnValue({
          get: jest.fn().mockResolvedValue([]),
        }),
      } as any),
  );

  describe('when dispatching an update address employee command', () => {
    it('should validate that the product exists in the db', async () => {
      // Arrange
      const employeeValidator = new CheckEmployeeAddressExists(
        new MockEmployeeRepository(),
      );

      const params = {
        employeeId: 100,
        address: 'San Pedro Sula, Calle 1, Casa 5',
        city: 'San Pedro Sula',
        country: 'Honduras',
        region: 'Cortes',
      };

      // Act
      const updateEmployeeAddress = new UpdateEmployeeAddress(params.employeeId, params.address,
        params.country, params.region, params.city);
      const result = await employeeValidator.validate(updateEmployeeAddress);

      // Assert
      expect(result.hasError).toBeTruthy();
      expect(result.errors).toMatchObject([
        {
          field: 'employeeId',
          fieldLabel: 'employeeId',
          message: 'The employee does not exist',
          value: 100,
        },
      ]);
    });
  });
});
