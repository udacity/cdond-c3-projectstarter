import { EmployeeController } from './employee.controller';
import { SyncCommandDispatcher } from '../../common/commands';
import { CreateEmployeeRequest } from './requests/create-employee-request.interface';
import { EmployeeRepository } from './repositories/employees.repository';

describe('Employee Controller', () => {
  // Arrange
  // @ts-ignore
  const fakeEmployeeRepository: EmployeeRepository = {
    // @ts-ignore
    findByNames: jest.fn(),
  };

  let employeeController;

  // @ts-ignore
  const fakeCommandDispatcher: SyncCommandDispatcher = {
    // @ts-ignore
    execute: jest.fn(),
  };

  employeeController = new EmployeeController(
    fakeCommandDispatcher,
    fakeEmployeeRepository,
  );

  describe('When an employee is posted to the controller', () => {
    it('Should dispatch create employee command', async () => {
      // Arrange
      const request: CreateEmployeeRequest = {
        accountNumber: 'test',
        address: 'San Pedro Sula, Calle 1, Casa 5',
        bankName: 'Promerica',
        birthdate: '1993-14-04',
        city: 'San Pedro Sula',
        country: 'Honduras',
        displayName: 'Jimmy',
        effectiveDate: '2018-22-10',
        companyEmail: 'jimmyramos@acklenavenue.com',
        firstName: 'Jimmy',
        gender: 'Male',
        lastName: 'Ramos',
        middleName: 'Josue',
        personalEmail: 'jimmybanegas93@gmail.com',
        phoneNumber: '50494621230',
        region: 'Cortes',
        salary: '10',
        salaryType: 'Montly',
        secondLastName: 'Banegas',
        startDate: '2019-22-02',
        tags: 'Developer',
      };

      // Act
      await employeeController.createEmployee(request);

      // Assert
      expect(fakeCommandDispatcher.execute).toBeCalledWith(request);
    });
  });

  describe('when an employee name UPDATE is sent to the controller', () => {
    it('should dispatch change employee name command', async () => {
      // Arrange
      const request = {
        employeeId: 100,
        firstName: 'Jimmy',
        lastName: 'Ramos',
        middleName: 'Josue',
        secondLastName: 'Banegas',
      };

      // Act
      await employeeController.changeNames(100,request);

      // Assert
      expect(fakeCommandDispatcher.execute).toHaveBeenCalledWith(request);
    });
  });
  describe('when an employee address UPDATE is sent to the controller', () => {
    it('should dispatch update employee address command', async () => {
      // Arrange
      const request = {
        employeeId: 100,
        address: 'San Pedro Sula, Calle 5, Casa 1',
        city: 'San Pedro Sula',
        country: 'Honduras',
        region: 'Cortes',
      };

      // Act
      await employeeController.changeAddress(100, request);

      // Assert
      expect(fakeCommandDispatcher.execute).toHaveBeenCalledWith(request);
    });
  });
  describe('when an employee display name UPDATE is sent to the controller', () => {
    it('should dispatch update employee display name command', async () => {
      // Arrange
      const request = {
        employeeId: 100,
        displayName: 'Jimmy'
      };

      // Act
      await employeeController.changeDisplayName(100, request);

      // Assert
      expect(fakeCommandDispatcher.execute).toHaveBeenCalledWith(request);
    });
  });
  describe('when an employee tags UPDATE is sent to the controller', () => {
    it('should dispatch update tags employee command', async () => {
      // Arrange
      const request = {
        employeeId: 100,
        tags: 'Developer',
      };

      // Act
      await employeeController.changeTags(100, request);

      // Assert
      expect(fakeCommandDispatcher.execute).toHaveBeenCalledWith(request);
    });
  });
  describe('when an employee phone number UPDATE is sent to the controller', () => {
    it('should dispatch update phone number employee command', async () => {
      // Arrange
      const request = {
        employeeId: 100,
        phoneNumber: '50494621230',
        };

      // Act
      await employeeController.changePhoneNumber(100, request);

      // Assert
      expect(fakeCommandDispatcher.execute).toHaveBeenCalledWith(request);
    });
  });
  describe('when an employee personal emaill UPDATE is sent to the controller', () => {
    it('should dispatch update personal email employee command', async () => {
      // Arrange
      const request = {
        employeeId: 100,
        personalEmail: 'jimmybanegas93@gmail.com',
        };

      // Act
      await employeeController.changePersonalEmail(100, request);

      // Assert
      expect(fakeCommandDispatcher.execute).toHaveBeenCalledWith(request);
    });
  });
  describe('when an employee company email UPDATE is sent to the controller', () => {
    it('should dispatch update employee company email command', async () => {
      // Arrange
      const request = {
        employeeId: 100,
        companyEmail: 'jimmyramos@acklenavenue.com',
        };

      // Act
      await employeeController.changeCompanyEmail(100, request);

      // Assert
      expect(fakeCommandDispatcher.execute).toHaveBeenCalledWith(request);
    });
  });
  describe('when an employee salary UPDATE is sent to the controller', () => {
    it('should dispatch update employee salary command', async () => {
      // Arrange
      const request = {
        employeeId: 100,
        salary: 10
      };

      // Act
      await employeeController.changeSalary(100, request);

      // Assert
      expect(fakeCommandDispatcher.execute).toHaveBeenCalledWith(request);
    });
  });
  describe('when an employee salary type UPDATE is sent to the controller', () => {
    it('should dispatch update employee salary type command', async () => {
      // Arrange
      const request = {
        employeeId: 100,
        salaryType: 'Montly',
        };

      // Act
      await employeeController.changeSalaryType(100, request);

      // Assert
      expect(fakeCommandDispatcher.execute).toHaveBeenCalledWith(request);
    });
  });
  describe('when an employee effective date UPDATE is sent to the controller', () => {
    it('should dispatch update employee effective date command', async () => {
      // Arrange
      const request = {
        employeeId: 100,
        effectiveDate: '2018-22-10',
        };

      // Act
      await employeeController.changeEffectiveDate(100, request);

      // Assert
      expect(fakeCommandDispatcher.execute).toHaveBeenCalledWith(request);
    });
  });
  describe('when an employee UPDATE birthdate is sent to the controller', () => {
    it('should dispatch update employee birthdate command', async () => {
      // Arrange
      const request = {
        employeeId: 100,
        birthdate: '1993-14-04',
        };

      // Act
      await employeeController.changeBirthDate(100, request);

      // Assert
      expect(fakeCommandDispatcher.execute).toHaveBeenCalledWith(request);
    });
  });
  describe('when a UPDATE request is sent to the controller', () => {
    it('should disptach deactivateEmployee employee command', async () => {
      // Arrange
      const employee = { employeeId: 10, isActive: false};

      // Act
      await employeeController.deactivateEmployee(employee.employeeId, employee.isActive);

      // Assert
      expect(fakeCommandDispatcher.execute).toBeCalledTimes(13);
    });
  });
  describe('when a UPDATE request is sent to the controller', () => {
    it('should disptach activateEmployee employee command', async () => {
      // Arrange
      const employee = { employeeId: 10, isActive: true };

      // Act
      await employeeController.activateEmployee(employee.employeeId, employee.isActive);

      // Assert
      expect(fakeCommandDispatcher.execute).toBeCalledTimes(14);
    });
  });
});
