import { UpdateEmployeeCompanyEmail } from '../../update-employee-company-email.command';
import { EmployeeRepository } from '../../../repositories/employees.repository';
import { CheckEmployeeCompanyEmailExists } from './check-employee-exists.validator';

describe('Check if employee exists', () => {
  const MockEmployeeRepository = jest.fn<EmployeeRepository, []>(
    () =>
      ({
        where: jest.fn().mockReturnValue({
          get: jest.fn().mockResolvedValue([]),
        }),
      } as any),
  );

  describe('when dispatching an update company email employee command', () => {
    it('should validate that the product exists in the db', async () => {
      // Arrange
      const employeeValidator = new CheckEmployeeCompanyEmailExists(
        new MockEmployeeRepository(),
      );

      const params = {
        employeeId: 100,
        companyEmail: 'jimmyramos@acklenavenue.com'
      };

      // Act
      const updateEmployee = new UpdateEmployeeCompanyEmail(params.employeeId,params.companyEmail);
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
