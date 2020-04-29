import { CreateEmployeeCompositeValidator } from './forCreateEmployee/create-employee-composite.validator';
import { CheckPropertiesValue } from './forCreateEmployee/check-properties-value.validator';
import { CheckUpdateNamePropertiesValue } from './forUpdateEmployeeName/check-properties-value.validator';
import { CheckEmployeeNameExists } from './forUpdateEmployeeName/check-employee-exists.validator';
import { CheckEmployeeExistsOnDeactivate } from './forDeactivateEmployee/check-employee-exists.validator';
import { CheckEmployeeExistsOnActivate } from './forActivateEmployee/check-employee-exists.validator';
import { UpdateEmployeeNameCompositeValidator } from './forUpdateEmployeeName/update-employee-composite.validator';
import { DeactivateEmployeeCompositeValidator } from './forDeactivateEmployee/remove-employee-composite.validator';
import { ActivateEmployeeCompositeValidator } from './forActivateEmployee/activate-employee-composite.validator';
import {CheckUpdateAddressPropertiesValue} from './forUpdateEmployeeAddress/check-properties-value.validator';
import {CheckEmployeeAddressExists} from './forUpdateEmployeeAddress/check-employee-exists.validator';
import {UpdateEmployeeAddressCompositeValidator} from './forUpdateEmployeeAddress/update-employee-composite.validator';
import {CheckUpdateDisplayNamePropertiesValue} from './forUpdateEmployeeDisplayName/check-properties-value.validator';
import {CheckEmployeeDisplayNameExists} from './forUpdateEmployeeDisplayName/check-employee-exists.validator';
import {UpdateEmployeeDisplayNameCompositeValidator} from './forUpdateEmployeeDisplayName/update-employee-composite.validator';
import {CheckUpdateTagsPropertiesValue} from './forUpdateEmployeeTags/check-properties-value.validator';
import {CheckEmployeeTagsExists} from './forUpdateEmployeeTags/check-employee-exists.validator';
import {UpdateEmployeeTagsCompositeValidator} from './forUpdateEmployeeTags/update-employee-composite.validator';
import {CheckUpdatePhoneNumberPropertiesValue} from './forUpdateEmployeePhoneNumber/check-properties-value.validator';
import {CheckEmployeePhoneNumberExists} from './forUpdateEmployeePhoneNumber/check-employee-exists.validator';
import {UpdateEmployeePhoneNumberCompositeValidator} from './forUpdateEmployeePhoneNumber/update-employee-composite.validator';
import {CheckUpdatePersonalEmailPropertiesValue} from './forUpdateEmployeePersonalEmail/check-properties-value.validator';
import {CheckEmployeePersonalEmailExists} from './forUpdateEmployeePersonalEmail/check-employee-exists.validator';
import {UpdateEmployeePersonalEmailCompositeValidator} from './forUpdateEmployeePersonalEmail/update-employee-composite.validator';
import {CheckUpdateCompanyEmailPropertiesValue} from './forUpdateEmployeeCompanyEmail/check-properties-value.validator';
import {CheckEmployeeCompanyEmailExists} from './forUpdateEmployeeCompanyEmail/check-employee-exists.validator';
import {UpdateEmployeeCompanyEmailCompositeValidator} from './forUpdateEmployeeCompanyEmail/update-employee-composite.validator';
import {CheckUpdateSalaryPropertiesValue} from './forUpdateEmployeeSalary/check-properties-value.validator';
import {CheckEmployeeSalaryExists} from './forUpdateEmployeeSalary/check-employee-exists.validator';
import {UpdateEmployeeSalaryCompositeValidator} from './forUpdateEmployeeSalary/update-employee-composite.validator';
import {CheckUpdateSalaryTypePropertiesValue} from './forUpdateEmployeeSalaryType/check-properties-value.validator';
import {CheckEmployeeSalaryTypeExists} from './forUpdateEmployeeSalaryType/check-employee-exists.validator';
import {UpdateEmployeeSalaryTypeCompositeValidator} from './forUpdateEmployeeSalaryType/update-employee-composite.validator';
import {CheckUpdateEffectiveDatePropertiesValue} from './forUpdateEmployeeEffectiveDate/check-properties-value.validator';
import {CheckEmployeeEffectiveDateExists} from './forUpdateEmployeeEffectiveDate/check-employee-exists.validator';
import {UpdateEmployeeEffectiveDateCompositeValidator} from './forUpdateEmployeeEffectiveDate/update-employee-composite.validator';
import {CheckUpdateBirthDatePropertiesValue} from './forUpdateEmployeeBirthDate/check-properties-value.validator';
import {CheckEmployeeBirthDateExists} from './forUpdateEmployeeBirthDate/check-employee-exists.validator';
import {UpdateEmployeeBirthDateCompositeValidator} from './forUpdateEmployeeBirthDate/update-employee-composite.validator';

export const CommandValidators = [
  CheckPropertiesValue,
  CreateEmployeeCompositeValidator,
  CheckUpdateNamePropertiesValue,
  CheckEmployeeNameExists,
  UpdateEmployeeNameCompositeValidator,
  CheckEmployeeExistsOnDeactivate,
  DeactivateEmployeeCompositeValidator,
  CheckUpdateAddressPropertiesValue,
  CheckEmployeeAddressExists,
  UpdateEmployeeAddressCompositeValidator,
  CheckUpdateDisplayNamePropertiesValue,
  CheckEmployeeDisplayNameExists,
  UpdateEmployeeDisplayNameCompositeValidator,
  CheckUpdateTagsPropertiesValue,
  CheckEmployeeTagsExists,
  UpdateEmployeeTagsCompositeValidator,
  CheckUpdatePhoneNumberPropertiesValue,
  CheckEmployeePhoneNumberExists,
  UpdateEmployeePhoneNumberCompositeValidator,
  CheckUpdatePersonalEmailPropertiesValue,
  CheckEmployeePersonalEmailExists,
  UpdateEmployeePersonalEmailCompositeValidator,
  CheckUpdateCompanyEmailPropertiesValue,
  CheckEmployeeCompanyEmailExists,
  UpdateEmployeeCompanyEmailCompositeValidator,
  CheckUpdateSalaryPropertiesValue,
  CheckEmployeeSalaryExists,
  UpdateEmployeeSalaryCompositeValidator,
  CheckUpdateSalaryTypePropertiesValue,
  CheckEmployeeSalaryTypeExists,
  UpdateEmployeeSalaryTypeCompositeValidator,
  CheckEmployeeEffectiveDateExists,
  CheckUpdateEffectiveDatePropertiesValue,
  UpdateEmployeeEffectiveDateCompositeValidator,
  CheckEmployeeBirthDateExists,
  CheckUpdateBirthDatePropertiesValue,
  UpdateEmployeeBirthDateCompositeValidator,
  ActivateEmployeeCompositeValidator,
  CheckEmployeeExistsOnActivate
];
