import { HttpService } from '../../../services/httpService';
import { EmployeeModel, 
  EmployeeUpdateStringFieldModel, 
  EmployeeUpdateDateFieldModel,
  EmployeeUpdateNamesModel, 
  EmployeeUpdateAddressModel, 
  EmployeeUpdateNumberFieldModel
} from '../models/EmployeeModel';

type employeeUpdateTypes = EmployeeUpdateStringFieldModel
  | EmployeeUpdateDateFieldModel
  | EmployeeUpdateNumberFieldModel;
  
export class EmployeesService {
  private readonly employeesUrl: string;
  private readonly httpService: HttpService;

  constructor(baseUrl = process.env.API_URL) {
    this.employeesUrl = `${baseUrl}/api/Employees`;
    this.httpService = new HttpService();
  }

  async getAllEmployees(filteredBy?: string): Promise<GetEmployeesResponse> {
    const response = await this.httpService.get(this.employeesUrl, {
      params: {
        filter: filteredBy,
      },
    });
    return {
      employees: response,
    };
  }

  createEmployee(employee: EmployeeModel) {
    return this.httpService.post(this.employeesUrl, employee);
  }

  updateField = (id: string, payload:employeeUpdateTypes , 
    fieldName: string) => {
    let payloadReady:{[key:string]:string|Date|number} = {};
    payloadReady[fieldName] = payload.value;
    return this.httpService.put(`${this.employeesUrl}/${id}/${fieldName}`, payloadReady);
  } 

  updateAddress = (id: string, payload: EmployeeUpdateAddressModel) => {
    return this.httpService.put(`${this.employeesUrl}/${id}/address`, payload);
  }

  updateNames = (id: string, payload: EmployeeUpdateNamesModel) => {
    return this.httpService.put(`${this.employeesUrl}/${id}/names`, payload);
  }

  async deactivateEmployee(employeeId: string) {
    return this.httpService.put(`${this.employeesUrl}/${employeeId}/inactive`, {});
  }
  async activateEmployee(employeeId: string) {
    return this.httpService.put(`${this.employeesUrl}/${employeeId}/active`, {});
  }

  async getEmployeeById(id: string): Promise<EmployeeModel> {
    const response = await this.httpService.get(`${this.employeesUrl}/${id}`);
    return response as EmployeeModel;
  }
}

export interface GetEmployeesResponse {
  employees: EmployeeModel[];
}
