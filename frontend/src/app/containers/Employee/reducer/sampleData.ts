import { EmployeeModel, Gender, SalaryType } from '../models';

function generateFakeDate(): Date {
  return new Date(Math.random() * 10000);
}

const employee: EmployeeModel = {
  firstName: 'Test',
  middleName: 'First',
  lastName: 'Super',
  secondLastName: 'Second',
  displayName: 'Test First 2ND',
  companyEmail: 'test@gmail.com',
  personalEmail: 'testpersonal@gmail.com',
  birthdate: generateFakeDate(),
  startDate: generateFakeDate(),
  phoneNumber: '99002563',
  address: 'Fake Address',
  bankName: 'Test First Super Second',
  accountNumber: '001-04541-6446',
  gender: Gender.MALE,
  tags: '{\'hero\', \'acklen\'}',
  country: 'Honduras',
  region: 'Yoro',
  city: 'Morazán',
  salary: 15,
  salaryType: SalaryType.HOURLY,
  effectiveDate: generateFakeDate(),
  isActive: true,
};

export const employeesSampleData: EmployeeModel[] = [
  employee,
  employee,
  employee,
  employee,
];
