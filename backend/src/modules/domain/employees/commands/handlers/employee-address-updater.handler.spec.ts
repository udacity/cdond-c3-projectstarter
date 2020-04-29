import { EmployeeRepository } from '../../repositories/employees.repository';
import { EmployeeAddressUpdater } from './employee-address-updater.handler';
import { UpdateEmployeeAddress } from '../update-employee-address.command';

describe('Employee Address Updater', () => {
  describe('when an user updates an employee address', () => {
    const MockEmployeeRepository = jest.fn<EmployeeRepository, []>(
      () =>
        ({
          save: jest.fn(),
          findById: jest.fn().mockResolvedValue([]),
        } as any),
    );

    const employeeRepository = new MockEmployeeRepository();

    it('should get and employee and add it to the repository', async () => {
      // Arrange
      const handler = new EmployeeAddressUpdater(employeeRepository);

      const params = {
        employeeId: 100,
        address: 'San Pedro Sula, Calle 1, Casa 5',
        city: 'San Pedro Sula',
        country: 'Honduras',
        region: 'Cortes',
      };

      const updateEmployee = new UpdateEmployeeAddress(params.employeeId, params.address,
        params.country, params.region, params.city);

      // Act
      await handler.handle(updateEmployee);

      // Assert
      expect(employeeRepository.findById).toBeCalledWith(100);
      expect(employeeRepository.save).toBeCalled();
    });
  });
});
