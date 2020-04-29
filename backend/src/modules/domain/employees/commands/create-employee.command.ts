import { ICommand } from '../../../common/commands';

export class CreateEmployee implements ICommand {
  firstName: string;
  middleName?: string;
  lastName: string;
  secondLastName: string;
  displayName?: string;
  companyEmail: string;
  personalEmail?: string;
  birthdate: string;
  startDate: string;
  address?: string;
  phoneNumber?: string;
  bankName?: string;
  accountNumber?: string;
  gender: string;
  tags?: string;
  country: string;
  region: string;
  city: string;
  salary: string;
  effectiveDate: string;
  salaryType: string;

  constructor(firstName: string, middleName: string, lastName: string, secondLastName: string,
              displayName: string, companyEmail: string, personalEmail: string, birthdate: string, startDate: string,
              address: string, phoneNumber: string, bankName: string, accountNumber: string, gender: string,
              tags: string, country: string, region: string, city: string, salary: string, effectiveDate: string, salaryType: string) {
    this.accountNumber = accountNumber;
    this.address = address;
    this.firstName = firstName;
    this.gender = gender;
    this.lastName = lastName;
    this.middleName = middleName;
    this.personalEmail = personalEmail;
    this.phoneNumber = phoneNumber;
    this.region = region;
    this.salary = salary;
    this.salaryType = salaryType;
    this.secondLastName = secondLastName;
    this.startDate = startDate;
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
