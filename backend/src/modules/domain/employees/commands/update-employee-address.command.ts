import { ICommand } from '../../../common/commands';

export class UpdateEmployeeAddress implements ICommand {
  employeeId: number;
  address?: string;
  country: string;
  region: string;
  city: string;


  constructor(employeeId: number, address: string, country: string, region: string, city: string ) {
    this.employeeId = employeeId;
    this.address = address;
    this.region = region;
    this.country = country;
    this.city = city;
  }
}
