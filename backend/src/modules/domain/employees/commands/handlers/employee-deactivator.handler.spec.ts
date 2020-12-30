import { EmployeeRepository } from '../../repositories/employees.repository';
import { DeactivateEmployee } from '../deactivate-employee.command';
import { EmployeeDeactivator } from '../handlers/employee-deactivator.handler';

describe('Employee Remover', () => {
  describe('when a user removes an employee', () => {
    const MockEmployeeRepository = jest.fn<EmployeeRepository, []>(
      () =>
        ({
          findById: jest.fn().mockResolvedValue([]),
          save: jest.fn(),
        } as any),
    );

    const employeeRepository = new MockEmployeeRepository();

    it('should remove the employee from the repository', async () => {
      // Arrange
      const handler = new EmployeeDeactivator(employeeRepository);

      const params = {
        employeeId: 100,
        isActive: false
      };

      const deactivateEmployeeCommand = new DeactivateEmployee(params.employeeId, params.isActive);

      // Act
      await handler.handle(deactivateEmployeeCommand);

      // Assert
      expect(employeeRepository.findById).toBeCalledWith(100);
      expect(employeeRepository.save).toBeCalled();
    });
  });
});
