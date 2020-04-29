import { EmployeeRepository } from '../../repositories/employees.repository';
import { EmployeeUpdater } from './employee-updater.handler';
import { UpdateEmployee } from '../update-employee.command';

describe('Employee Updater', () => {
  describe('when an user updates an employee', () => {
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
      const handler = new EmployeeUpdater(employeeRepository);

      const params = {
        employeeId: 100,
        displayName: 'Test display',
        accountNumber: 'test',
        address: 'San Pedro Sula, Calle 1, Casa 5',
        birthdate: '2008-09-15T15:53:00',
        city: 'San Pedro Sula',
        country: 'Honduras',
        effectiveDate: '2008-09-15T15:53:00',
        email: 'jimmyramos@acklenavenue.com',
        firstName: 'Jimmy',
        lastName: 'Ramos',
        personalEmail: 'jimmybanegas93@gmail.com',
        phoneNumber: '50494621230',
        region: 'Cortes',
        salary: 10,
        salaryType: 'Montly',
        secondLastName: 'Banegas',
        tags: 'Developer',
        bankName: 'Promerica',
        middleName: 'test',
      };

      const updateEmployee = new UpdateEmployee(params.employeeId, params.firstName, params.middleName,
        params.lastName, params.secondLastName, params.displayName, params.email,
        params.personalEmail, params.birthdate, params.address,
        params.phoneNumber, params.bankName, params.accountNumber,
        params.tags, params.country, params.region, params.city, params.salary,
        params.effectiveDate, params.salaryType);

      // Act
      await handler.handle(updateEmployee);

      // Assert
      expect(employeeRepository.findById).toBeCalledWith(100);
      expect(employeeRepository.save).toBeCalled();
    });
  });
});
