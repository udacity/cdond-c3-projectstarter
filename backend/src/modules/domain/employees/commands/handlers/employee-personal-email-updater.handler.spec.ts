import { EmployeeRepository } from '../../repositories/employees.repository';
import { EmployeePersonalEmailUpdater } from './employee-personal-email-updater.handler';
import { UpdateEmployeePersonalEmail } from '../update-employee-personal-email.command';

describe('Employee Personal Email Updater', () => {
  describe('when an user updates an employee personal email', () => {
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
      const handler = new EmployeePersonalEmailUpdater(employeeRepository);

      const params = {
        employeeId: 100,
        personalEmail: 'jimmybanegas93@gmail.com',
      };

      const updateEmployee = new UpdateEmployeePersonalEmail(params.employeeId, params.personalEmail);

      // Act
      await handler.handle(updateEmployee);

      // Assert
      expect(employeeRepository.findById).toBeCalledWith(100);
      expect(employeeRepository.save).toBeCalled();
    });
  });
});
