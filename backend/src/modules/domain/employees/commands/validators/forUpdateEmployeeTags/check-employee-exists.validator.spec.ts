import { UpdateEmployeeTags } from '../../update-employee-tags.command';
import { EmployeeRepository } from '../../../repositories/employees.repository';
import { CheckEmployeeTagsExists } from './check-employee-exists.validator';

describe('Check if employee exists', () => {
  const MockEmployeeRepository = jest.fn<EmployeeRepository, []>(
    () =>
      ({
        where: jest.fn().mockReturnValue({
          get: jest.fn().mockResolvedValue([]),
        }),
      } as any),
  );

  describe('when dispatching an update tags employee command', () => {
    it('should validate that the product exists in the db', async () => {
      // Arrange
      const employeeValidator = new CheckEmployeeTagsExists(
        new MockEmployeeRepository(),
      );

      const params = {
        employeeId: 100,
        tags: 'Developer',
        };

      // Act
      const updateEmployee = new UpdateEmployeeTags(params.employeeId, params.tags);
      const result = await employeeValidator.validate(updateEmployee);

      // Assert
      expect(result.hasError).toBeTruthy();
      expect(result.errors).toMatchObject([
        {
          field: 'employeeId',
          fieldLabel: 'employeeId',
          message: 'The employee does not exist',
          value: 100,
        },
      ]);
    });
  });
});
