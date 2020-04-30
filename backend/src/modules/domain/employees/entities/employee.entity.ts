import * as moment from 'moment-timezone';
import { AggregateRoot } from '../../../common/entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateEmployee } from '../commands/create-employee.command';
import { EmployeeCreated } from '../events/employee-created.event';

@Entity()
export class Employee extends AggregateRoot<string> {
  //change <string> to <number> above to fix the compile error
  constructor(params = {} as CreateEmployee) {
    super();
    if (params) {
      this.accountNumber = params.accountNumber;
      this.address = params.address;
      this.firstName = params.firstName;
      this.gender = getGenderFromEnum(params.gender);
      this.lastName = params.lastName;
      this.middleName = params.middleName;
      this.personalEmail = params.personalEmail;
      this.phoneNumber = params.phoneNumber;
      this.region = params.region;
      this.salary = +params.salary;
      this.salaryType = getSalaryTypeFromEnum(params.salaryType);
      this.secondLastName = params.secondLastName;
      this.startDate = getDateFromString(params.startDate);
      this.tags = params.tags;
      this.city = params.city;
      this.country = params.country;
      this.displayName = params.displayName;
      this.effectiveDate = getDateFromString(params.effectiveDate);
      this.companyEmail = params.companyEmail;
      this.bankName = params.bankName;
      this.birthdate = getDateFromString(params.birthdate);
    }

    // this.apply(new EmployeeCreated(this.id, this.firstName));
  }

  @PrimaryGeneratedColumn()
  //change <string> to <number> in line 8 to fix the compile error
  id: number;

  @Column({ length: 100 })
  public firstName: string;

  @Column({ length: 100, nullable: true })
  public middleName: string;

  @Column({ length: 100 })
  public lastName: string;

  @Column({ length: 100, nullable: true })
  public secondLastName: string;

  @Column({ length: 100, nullable: true })
  public displayName: string;

  @Column({ length: 50, default: '' })
  public companyEmail: string;

  @Column({ length: 50, nullable: true, default: '' })
  public personalEmail: string;

  @Column({ nullable: true })
  public birthdate: Date;

  @Column()
  public startDate: Date;

  @Column({ length: 200, nullable: true })
  public address: string;

  @Column({ length: 100, nullable: true })
  public phoneNumber: string;

  @Column({ length: 100, nullable: true })
  public bankName: string;

  @Column({ length: 100, nullable: true })
  public accountNumber: string;

  @Column({ nullable: true })
  public gender: Gender;

  @Column({ type: 'json', default: '{}' })
  public tags: string;

  @Column({ length: 100 })
  public country: string;

  @Column({ length: 100 })
  public region: string;

  @Column({ length: 100 })
  public city: string;

  @Column()
  public effectiveDate: Date;

  @Column('decimal')
  public salary: number;

  @Column()
  public salaryType: SalaryType;

  @Column({ default: true })
  public isActive: boolean;

  @Column({ default: 40 })
  public workingHoursPerWeek: number;
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum SalaryType {
  YEARLY = 'yearly',
  HOURLY = 'hourly',
}

export function getDateFromString(date: string): Date {
  return moment(date).format('M/D/YYYY');
}

function getGenderFromEnum(gender: string): Gender {
  return Gender[Object.keys(Gender).find(key => Gender[key] === gender)];
}

function getSalaryTypeFromEnum(salaryType: string): SalaryType {
  return SalaryType[
    Object.keys(SalaryType).find(key => SalaryType[key] === salaryType)
  ];
}
