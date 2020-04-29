import { handleActions } from 'redux-actions';
import { EmployeeActions, EmployeePayloadType } from '../actions';
import { EmployeeState } from './state';
import { GetEmployeesResponse } from '../services';

export const employeesInitialState: EmployeeState = {
  errorMessage: '',
  isFetching: false,
  employees: [],
};

export const employeeReducer = handleActions<EmployeeState, EmployeePayloadType>(
  {
    [EmployeeActions.Type.FETCH_EMPLOYEES_REQUEST]: state => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [EmployeeActions.Type.FETCH_EMPLOYEES_FAILURE]: (state, action) => {
      return {
        ...state,
        isFetching: false,
        errorMessage: (action.payload as Error).message || '',
      };
    },
    [EmployeeActions.Type.FETCH_EMPLOYEES_SUCCESS]: (state, action) => {
      const payload = action.payload;
      if (!payload) {
        return {
          ...state,
          isFetching: false,
        };
      }

      return {
        ...state,
        isFetching: false,
        employees: (payload as GetEmployeesResponse).employees,
      };
    },
    [EmployeeActions.Type.ADD_EMPLOYEE_REQUEST]: state => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [EmployeeActions.Type.ADD_EMPLOYEE_FAILURE]: (state, action) => {
      return {
        ...state,
        isFetching: false,
        errorMessage: (action.payload as Error).message || '',
      };
    },
    [EmployeeActions.Type.ADD_EMPLOYEE_SUCCESS]: state => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [EmployeeActions.Type.UPDATE_EMPLOYEE_DISPLAY_NAME_FAILURE]: (state, action) => {
      return {
        ...state,
        isFetching: false,
        errorMessage: (action.payload as Error).message
      };
    },
  },
  employeesInitialState,
);
