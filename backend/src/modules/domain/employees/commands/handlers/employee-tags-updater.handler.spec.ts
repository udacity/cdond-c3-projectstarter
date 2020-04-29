import { EmployeeRepository } from '../../repositories/employees.repository';
import { EmployeeTagsUpdater } from './employee-tags-updater.handler';
import { UpdateEmployeeTags } from '../update-employee-tags.command';

describe('Employee Tags Updater', () => {
  describe('when an user updates an employee tags', () => {
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
      const handler = new EmployeeTagsUpdater(employeeRepository);

      const params = {
        employeeId: 100,
        tags: 'Developer'
      };

      const updateEmployee = new UpdateEmployeeTags(params.employeeId, params.tags);

      // Act
      await handler.handle(updateEmployee);

      // Assert
      expect(employeeRepository.findById).toBeCalledWith(100);
      expect(employeeRepository.save).toBeCalled();
    });
  });
});
