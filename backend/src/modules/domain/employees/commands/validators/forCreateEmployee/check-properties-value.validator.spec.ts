import { CheckPropertiesValue } from '../forCreateEmployee/check-properties-value.validator';
import { CreateEmployee } from '../../create-employee.command';

describe('Create Employee Validator', () => {
  describe('When sending a complete save employee command', () => {
    it('should pass the validation if the command is correct', async () => {
      // Arrange
      const createEmployeeValidator = new CheckPropertiesValue();

      const params = {
        displayName: 'Test display',
        accountNumber: 'test',
        address: 'San Pedro Sula, Calle 1, Casa 5',
        birthdate: '2008-09-15T15:53:00',
        city: 'San Pedro Sula',
        country: 'Honduras',
        effectiveDate: '2008-09-15T15:53:00',
        email: 'jimmyramos@acklenavenue.com',
        firstName: 'Jimmy',
        gender: 'Male',
        lastName: 'Ramos',
        personalEmail: 'jimmybanegas93@gmail.com',
        phoneNumber: '50494621230',
        region: 'Cortes',
        salary: '10',
        salaryType: 'Montly',
        secondLastName: 'Banegas',
        startDate: '2008-09-15T15:53:00',
        tags: 'Developer',
        bankName: 'Promerica',
        middleName: 'test',
      };

      // Act
      const createEmployee = new CreateEmployee(params.firstName, params.middleName,
        params.lastName, params.secondLastName, params.displayName, params.email,
        params.personalEmail, params.birthdate, params.startDate, params.address,
        params.phoneNumber, params.bankName, params.accountNumber, params.gender,
        params.tags, params.country, params.region, params.city, params.salary,
        params.effectiveDate, params.salaryType);
      const result = await createEmployeeValidator.validate(createEmployee);

      console.log(result.errors);

      // Assert
      expect(result.hasError).toBeFalsy();
      expect(result.errors.length).toBeLessThanOrEqual(0);
    });
  });
});
