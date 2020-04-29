import { EmployeeModel } from '../models/EmployeeModel';

export interface EmployeeState {
    isFetching: boolean;
    errorMessage: string;
    employees: EmployeeModel[];
  }
