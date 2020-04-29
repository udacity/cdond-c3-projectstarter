import { RouterState } from 'react-router-redux';
import { EmployeeState } from 'app/containers/Employee/reducer/state';
export interface RootState {
  router: RouterState;
  employees: EmployeeState;
}

export interface SortedColumn {
  id: string;
  desc: boolean;
}
