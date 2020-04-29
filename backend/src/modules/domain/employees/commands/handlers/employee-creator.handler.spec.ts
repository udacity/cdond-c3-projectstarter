import { EmployeeCreator } from './employee-creator.handler';
import { CreateEmployee } from '../create-employee.command';
import { EmployeeRepository } from '../../repositories/employees.repository';

describe('Employee Creator', () => {
  describe('when an user creates and employee', () => {
    const MockEmployeeRepository = jest.fn<EmployeeRepository, []>(
      () =>
        ({
          save: jest.fn(),
        } as any),
    );

    const employeeRepository = new MockEmployeeRepository();

    it('should add an employee to the repo', async () => {
      // Arrange
      const handler = new EmployeeCreator(employeeRepository);

      const params = {
        accountNumber: 'test',
        displayName: 'Test display',
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

      const createEmployee = new CreateEmployee(params.firstName, params.middleName,
        params.lastName, params.secondLastName, params.displayName, params.email,
        params.personalEmail, params.birthdate, params.startDate, params.address,
        params.phoneNumber, params.bankName, params.accountNumber, params.gender,
        params.tags, params.country, params.region, params.city, params.salary,
        params.effectiveDate, params.salaryType);

      // Act
      await handler.handle(createEmployee);

      // Assert
      expect(employeeRepository.save).toBeCalled();
    });
  });
});
