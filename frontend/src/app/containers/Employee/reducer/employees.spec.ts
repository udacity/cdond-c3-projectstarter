import { EmployeeActions } from '../actions';
import { EmployeeState } from './state';
import { employeeReducer, employeesInitialState } from './employees';
// import { employeesSampleData } from "./sampleData";

describe('Employees Reducer', () => {
  const initialState: EmployeeState = {
    ...employeesInitialState,
  };

  describe(EmployeeActions.Type.ADD_EMPLOYEE_REQUEST, () => {
    it('Should set the isFetching flag to true', () => {
      const state: EmployeeState = {
        ...initialState,
        isFetching: false,
      };
      const action: any = EmployeeActions.addEmployeeRequest();
      const mutatedState = employeeReducer(state, action);
      expect(mutatedState.isFetching).toBeTruthy();
    });
  });
  describe(EmployeeActions.Type.ADD_EMPLOYEE_FAILURE, () => {
    it('Should update the state error message', () => {
      const state: EmployeeState = {
        ...initialState,
        isFetching: true,
      };
      const error = 'Ups! Something went wrong :)';
      const action: any = EmployeeActions.addEmployeeFailure(error);
      const mutatedState = employeeReducer(state, action);
      expect(mutatedState.isFetching).toBeFalsy();
    });
  });
  describe(EmployeeActions.Type.ADD_EMPLOYEE_SUCCESS, () => {
    it('Should set the isFetching flag to false', () => {
      const state: EmployeeState = {
        ...initialState,
        isFetching: true,
      };
      const action: any = EmployeeActions.addEmployeeSuccess(true);
      const mutatedState = employeeReducer(state, action);
      expect(mutatedState.isFetching).toBeFalsy();
    });
  });
});
