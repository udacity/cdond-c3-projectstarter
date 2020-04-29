import { Dispatch } from 'redux';
import { createAction } from 'redux-actions';
import { 
  EmployeeModel, 
  EmployeeUpdateStringFieldModel, 
  EmployeeUpdateNumberFieldModel, 
  EmployeeUpdateDateFieldModel, 
  EmployeeUpdateNamesModel,
  EmployeeUpdateAddressModel,
} from '../models/EmployeeModel';
import { EmployeesService, GetEmployeesResponse } from '../services/employees';
import { push } from 'react-router-redux';
import { showErrorNotification, showSuccessNotification } from 'app/utils';
import text from '../../../../assets/translations';

export namespace EmployeeActions {
  export enum Type {
    FETCH_EMPLOYEES_REQUEST = 'FETCH_EMPLOYEES_REQUEST',
    FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS',
    FETCH_EMPLOYEES_FAILURE = 'FETCH_EMPLOYEES_FAILURE',
    ADD_EMPLOYEE_REQUEST = 'ADD_EMPLOYEE_REQUEST',
    ADD_EMPLOYEE_SUCCESS = 'ADD_EMPLOYEE_SUCCESS',
    ADD_EMPLOYEE_FAILURE = 'ADD_EMPLOYEE_FAILURE',
    DEACTIVATE_EMPLOYEE_REQUEST = 'DEACTIVATE_EMPLOYEE_REQUEST',
    DEACTIVATE_EMPLOYEE_SUCCESS = 'DEACTIVATE_EMPLOYEE_SUCCESS',
    DEACTIVATE_EMPLOYEE_FAILURE = 'DEACTIVATE_EMPLOYEE_FAILURE',
    ACTIVATE_EMPLOYEE_REQUEST = 'ACTIVATE_EMPLOYEE_REQUEST',
    ACTIVATE_EMPLOYEE_SUCCESS = 'ACTIVATE_EMPLOYEE_SUCCESS',
    ACTIVATE_EMPLOYEE_FAILURE = 'ACTIVATE_EMPLOYEE_FAILURE',
    UPDATE_EMPLOYEE_DISPLAY_NAME_FAILURE = 'UPDATE_EMPLOYEE_DISPLAY_NAME_FAILURE',
  }

  // Get employees actions
  export const fetchEmployeesRequest = createAction(
    Type.FETCH_EMPLOYEES_REQUEST,
  );
  export const fetchEmployeesSuccess = createAction<GetEmployeesResponse>(
    Type.FETCH_EMPLOYEES_SUCCESS,
  );
  export const fetchEmployeesFailure = createAction<any>(
    Type.FETCH_EMPLOYEES_FAILURE,
  );

  // Create employee
  export const addEmployeeRequest = createAction(Type.ADD_EMPLOYEE_REQUEST);
  export const addEmployeeSuccess = createAction<any>(
    Type.ADD_EMPLOYEE_SUCCESS,
  );
  export const addEmployeeFailure = createAction<any>(
    Type.ADD_EMPLOYEE_FAILURE,
  );

  // Deactivate employee
  export const deactivateEmployeeRequest = createAction(
    Type.DEACTIVATE_EMPLOYEE_REQUEST,
  );
  export const deactivateEmployeeSuccess = createAction<any>(
    Type.DEACTIVATE_EMPLOYEE_SUCCESS,
  );
  export const deactivateEmployeeFailure = createAction<any>(
    Type.DEACTIVATE_EMPLOYEE_FAILURE,
  );
  // Activate employee
  export const activateEmployeeRequest = createAction(
    Type.ACTIVATE_EMPLOYEE_REQUEST,
  );
  export const activateEmployeeSuccess = createAction<any>(
    Type.ACTIVATE_EMPLOYEE_SUCCESS,
  );
  export const activateEmployeeFailure = createAction<any>(
    Type.ACTIVATE_EMPLOYEE_FAILURE,
  );

  export const updateEmployeeDisplayNameFailure = createAction<Error>(
    Type.UPDATE_EMPLOYEE_DISPLAY_NAME_FAILURE
  );

  // Async Actions are handled by thunk middleware
  export function fetchEmployees(
    filteredBy?: string,
  ): (dispatch: Dispatch) => Promise<void> {
    return async (dispatch: Dispatch) => {
      dispatch(fetchEmployeesRequest());
      try {
        const employeeService = new EmployeesService();
        const response = await employeeService.getAllEmployees(filteredBy);
        dispatch(fetchEmployeesSuccess(response));
      } catch (error) {
        console.error(error);
        dispatch(fetchEmployeesFailure(error));
      }
    };
  }

  export const addEmployee = (payload: EmployeeModel) => {
    return async (dispatch: Dispatch) => {
      dispatch(addEmployeeRequest());
      try {
        const employeeService = new EmployeesService();
        const response = await employeeService.createEmployee(payload);
        dispatch(addEmployeeSuccess(response));
        dispatch(push('/employees'));
        showSuccessNotification(text.CHANGES_SAVED);
      } catch (error) {
        console.error(error);
        showErrorNotification(text.GENERIC_ERROR);
        dispatch(addEmployeeFailure(error));
      }
    };
  };

  export const deactivateEmployee = (employeeId: string) => {
    return async () => {
      try {
        await new EmployeesService().deactivateEmployee(employeeId);
        showSuccessNotification(text.EDIT_EMPLOYEE_FIELD_SUCCESS);
      } catch (error) {
        console.error(error);
        showErrorNotification(text.GENERIC_ERROR);
      }
    };
  };
  export const activateEmployee = (employeeId: string) => {
    return async () => {
      try {
        await new EmployeesService().activateEmployee(employeeId);
        showSuccessNotification(text.EDIT_EMPLOYEE_FIELD_SUCCESS);
      } catch (error) {
        console.error(error);
        showErrorNotification(text.GENERIC_ERROR);
      }
    };
  };

  export const updateStringField = (
    employeeId: string,
    payload: EmployeeUpdateStringFieldModel,
    fieldName: string
  ) => async () => {
    try {
      await new EmployeesService().updateField(employeeId, payload, fieldName);
      showSuccessNotification(text.EDIT_EMPLOYEE_FIELD_SUCCESS);
    } catch (error) {
      console.error(error);
      showErrorNotification(text.EDIT_EMPLOYEE_FIELD_ERROR);
    }
  }

 export const updateNumberField = (
  employeeId: string,
  payload: EmployeeUpdateNumberFieldModel,
  fieldName: string
) => async () => {
  try {
    await new EmployeesService().updateField(employeeId, payload, fieldName);
    showSuccessNotification(text.EDIT_EMPLOYEE_FIELD_SUCCESS)
  } catch (error) {
    console.error(error);
    showErrorNotification(text.EDIT_EMPLOYEE_FIELD_ERROR);
  }
}

  export const updateDateField = (
    employeeId: string,
    payload: EmployeeUpdateDateFieldModel,
    fieldName: string
  ) => async () => {
    try {
      await new EmployeesService().updateField(employeeId, payload, fieldName);
      showSuccessNotification(text.EDIT_EMPLOYEE_FIELD_SUCCESS);
    } catch (error) {
      console.error(error);
      showErrorNotification(text.EDIT_EMPLOYEE_FIELD_ERROR);
    }
  }

  export const updateNames = (
    employeeId: string,
    payload: EmployeeUpdateNamesModel
  ) => async () => {
    try {
      await new EmployeesService().updateNames(employeeId, payload);
      showSuccessNotification(text.EDIT_EMPLOYEE_FIELD_SUCCESS);
    } catch (error) {
      console.error(error);
      showErrorNotification(text.EDIT_EMPLOYEE_FIELD_ERROR);
    }
  }

  export const updateAddress = (
    employeeId: string,
    payload: EmployeeUpdateAddressModel
  ) => async () => {
    try {
      await new EmployeesService().updateAddress(employeeId, payload);
      showSuccessNotification(text.EDIT_EMPLOYEE_FIELD_SUCCESS);
    } catch (error) {
      console.error(error);
      showErrorNotification(text.EDIT_EMPLOYEE_FIELD_ERROR);
    }
  }
}

export type EmployeeActions = Omit<typeof EmployeeActions, 'Type'>;
export interface AddEmployeePayload {
  employee: EmployeeModel;
}

export type EmployeePayloadType =  GetEmployeesResponse | Error;