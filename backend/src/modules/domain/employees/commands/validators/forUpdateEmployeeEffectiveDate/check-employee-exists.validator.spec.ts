import { UpdateEmployeeEffectiveDate } from '../../update-employee-effective-date.command';
import { EmployeeRepository } from '../../../repositories/employees.repository';
import { CheckEmployeeEffectiveDateExists } from './check-employee-exists.validator';

describe('Check if employee exists', () => {
  const MockEmployeeRepository = jest.fn<EmployeeRepository, []>(
    () =>
      ({
        where: jest.fn().mockReturnValue({
          get: jest.fn().mockResolvedValue([]),
        }),
      } as any),
  );

  describe('when dispatching an update effective date employee command', () => {
    it('should validate that the product exists in the db', async () => {
      // Arrange
      const employeeValidator = new CheckEmployeeEffectiveDateExists(
        new MockEmployeeRepository(),
      );

      const params = {
        employeeId: 100,
        effectiveDate: '2008-09-15T15:53:00',
      };

      // Act
      const updateEmployee = new UpdateEmployeeEffectiveDate(params.employeeId, params.effectiveDate);
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
