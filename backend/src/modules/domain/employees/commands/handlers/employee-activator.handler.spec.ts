import { EmployeeRepository } from '../../repositories/employees.repository';
import { ActivateEmployee } from '../activate-employee.command';
import { EmployeeActivator } from './employee-activator.handler';

describe('Employee Remover', () => {
  describe('when a user activates an employee', () => {
    const MockEmployeeRepository = jest.fn<EmployeeRepository, []>(
      () =>
        ({
          findById: jest.fn().mockResolvedValue([]),
          save: jest.fn(),
        } as any),
    );

    const employeeRepository = new MockEmployeeRepository();

    it('should activate the employee from the repository', async () => {
      // Arrange
      const handler = new EmployeeActivator(employeeRepository);

      const params = {
        employeeId: 100,
        isActive: false
      };

      const activateEmployeeCommand = new ActivateEmployee(params.employeeId, params.isActive);

      // Act
      await handler.handle(activateEmployeeCommand);

      // Assert
      expect(employeeRepository.findById).toBeCalledWith(100);
      expect(employeeRepository.save).toBeCalled();
    });
  });
});
