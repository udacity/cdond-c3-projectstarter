import { ICommand } from '../../../common/commands';

export class UpdateEmployee implements ICommand {
  employeeId: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  secondLastName: string;
  displayName?: string;
  companyEmail: string;
  personalEmail?: string;
  birthdate: string;
  address?: string;
  phoneNumber?: string;
  bankName?: string;
  accountNumber?: string;
  tags?: string;
  country: string;
  region: string;
  city: string;
  salary: number;
  effectiveDate: string;
  salaryType: string;

  constructor(employeeId: number, firstName: string, middleName: string, lastName: string, secondLastName: string,
              displayName: string, companyEmail: string, personalEmail: string, birthdate: string, address: string,
              phoneNumber: string, bankName: string, accountNumber: string, tags: string,
              country: string, region: string, city: string, salary: number, effectiveDate: string, salaryType: string) {
    this.employeeId = employeeId;
    this.accountNumber = accountNumber;
    this.address = address;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.personalEmail = personalEmail;
    this.phoneNumber = phoneNumber;
    this.region = region;
    this.salary = salary;
    this.salaryType = salaryType;
    this.secondLastName = secondLastName;
    this.tags = tags;
    this.city = city;
    this.country = country;
    this.displayName = displayName;
    this.effectiveDate = effectiveDate;
    this.companyEmail = companyEmail;
    this.bankName = bankName;
    this.birthdate = birthdate;
  }
}
