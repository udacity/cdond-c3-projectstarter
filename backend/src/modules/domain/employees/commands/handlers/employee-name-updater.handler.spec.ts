import { EmployeeRepository } from '../../repositories/employees.repository';
import { EmployeeNameUpdater } from './employee-name-updater.handler';
import { UpdateEmployeeName } from '../update-employee-name.command';

describe('Employee Name Updater', () => {
  describe('when an user updates an employee name', () => {
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
      const handler = new EmployeeNameUpdater(employeeRepository);

      const params = {
        employeeId: 100,
        firstName: 'Jimmy',
        lastName: 'Ramos',
        secondLastName: 'Banegas',
        middleName: 'test',
      };

      const updateEmployee = new UpdateEmployeeName(params.employeeId, params.firstName, params.middleName,
        params.lastName, params.secondLastName);

      // Act
      await handler.handle(updateEmployee);

      // Assert
      expect(employeeRepository.findById).toBeCalledWith(100);
      expect(employeeRepository.save).toBeCalled();
    });
  });
});
