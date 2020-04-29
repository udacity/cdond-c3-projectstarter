import { EmployeeRepository } from '../../repositories/employees.repository';
import { EmployeeCompanyEmailUpdater } from './employee-company-email-updater.handler';
import { UpdateEmployeeCompanyEmail } from '../update-employee-company-email.command';

describe('Employee Company Email Updater', () => {
  describe('when an user updates an employee company email', () => {
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
      const handler = new EmployeeCompanyEmailUpdater(employeeRepository);

      const params = {
        employeeId: 100,
        companyEmail: 'jimmyramos@acklenavenue.com',
      };

      const updateEmployee = new UpdateEmployeeCompanyEmail(params.employeeId, params.companyEmail);

      // Act
      await handler.handle(updateEmployee);

      // Assert
      expect(employeeRepository.findById).toBeCalledWith(100);
      expect(employeeRepository.save).toBeCalled();
    });
  });
});
