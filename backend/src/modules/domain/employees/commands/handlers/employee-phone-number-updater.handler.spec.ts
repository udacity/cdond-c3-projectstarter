import { EmployeeRepository } from '../../repositories/employees.repository';
import { EmployeePhoneNumberUpdater } from './employee-phone-number-updater.handler';
import { UpdateEmployeePhoneNumber } from '../update-employee-phone-number.command';

describe('Employee Phone Number Updater', () => {
  describe('when an user updates an employee phone number', () => {
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
      const handler = new EmployeePhoneNumberUpdater(employeeRepository);

      const params = {
        employeeId: 100,
        phoneNumber: '50494621230'
      };

      const updateEmployee = new UpdateEmployeePhoneNumber(params.employeeId, params.phoneNumber);

      // Act
      await handler.handle(updateEmployee);

      // Assert
      expect(employeeRepository.findById).toBeCalledWith(100);
      expect(employeeRepository.save).toBeCalled();
    });
  });
});
