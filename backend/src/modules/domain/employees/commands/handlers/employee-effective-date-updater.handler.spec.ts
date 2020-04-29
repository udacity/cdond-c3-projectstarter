import { EmployeeRepository } from '../../repositories/employees.repository';
import { EmployeeEffectiveDateUpdater } from './employee-effective-date-updater.handler';
import { UpdateEmployeeEffectiveDate } from '../update-employee-effective-date.command';

describe('Employee Effective Date Updater', () => {
  describe('when an user updates an employee effective date', () => {
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
      const handler = new EmployeeEffectiveDateUpdater(employeeRepository);

      const params = {
        employeeId: 100,
        effectiveDate: '2008-09-15T15:53:00',
      };

      const updateEmployee = new UpdateEmployeeEffectiveDate(params.employeeId, params.effectiveDate);

      // Act
      await handler.handle(updateEmployee);

      // Assert
      expect(employeeRepository.findById).toBeCalledWith(100);
      expect(employeeRepository.save).toBeCalled();
    });
  });
});
