import { EmployeeRepository } from '../../repositories/employees.repository';
import { EmployeeDisplayNameUpdater } from './employee-display-name-updater.handler';
import { UpdateEmployeeDisplayName } from '../update-employee-display-name.command';

describe('Employee Display Name Updater', () => {
  describe('when an user updates an employee display name ', () => {
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
      const handler = new EmployeeDisplayNameUpdater(employeeRepository);

      const params = {
        employeeId: 100,
        displayName: 'Test display',
      };

      const updateEmployee = new UpdateEmployeeDisplayName(params.employeeId, params.displayName);

      // Act
      await handler.handle(updateEmployee);

      // Assert
      expect(employeeRepository.findById).toBeCalledWith(100);
      expect(employeeRepository.save).toBeCalled();
    });
  });
});
