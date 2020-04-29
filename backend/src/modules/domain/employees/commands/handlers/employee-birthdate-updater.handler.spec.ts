import { EmployeeRepository } from '../../repositories/employees.repository';
import { EmployeeBirthDateUpdater } from './employee-birthdate-updater.handler';
import { UpdateEmployeeBirthdate } from '../update-employee-birthdate.command';

describe('Employee Birthdate Updater', () => {
  describe('when an user updates an employee birthdate', () => {
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
      const handler = new EmployeeBirthDateUpdater(employeeRepository);

      const params = {
        employeeId: 100,
        birthdate: '2008-09-15T15:53:00',
      };

      const updateEmployee = new UpdateEmployeeBirthdate(params.employeeId, params.birthdate);

      // Act
      await handler.handle(updateEmployee);

      // Assert
      expect(employeeRepository.findById).toBeCalledWith(100);
      expect(employeeRepository.save).toBeCalled();
    });
  });
});
