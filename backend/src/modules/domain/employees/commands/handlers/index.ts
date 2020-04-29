import { EmployeeCreator } from './employee-creator.handler';
import { EmployeeUpdater } from './employee-updater.handler';
import {EmployeeNameUpdater} from './employee-name-updater.handler';
import {EmployeeAddressUpdater} from './employee-address-updater.handler';
import { EmployeeDeactivator } from './employee-deactivator.handler';
import { EmployeeActivator } from './employee-activator.handler';
import {EmployeeDisplayNameUpdater} from './employee-display-name-updater.handler';
import {EmployeeTagsUpdater} from './employee-tags-updater.handler';
import { EmployeePhoneNumberUpdater } from "./employee-phone-number-updater.handler";
import { EmployeePersonalEmailUpdater } from "./employee-personal-email-updater.handler";
import { EmployeeCompanyEmailUpdater } from "./employee-company-email-updater.handler";
import { EmployeeSalaryUpdater } from "./employee-salary-updater.handler";
import {EmployeeSalaryTypeUpdater} from './employee-salary-type-updater.handler';
import { EmployeeEffectiveDateUpdater } from "./employee-effective-date-updater.handler";
import { EmployeeBirthDateUpdater } from "./employee-birthdate-updater.handler";

export const CommandHandlers = [
  EmployeeCreator,
  EmployeeUpdater,
  EmployeeDeactivator,
  EmployeeActivator,
  EmployeeNameUpdater,
  EmployeeAddressUpdater,
  EmployeeDisplayNameUpdater,
  EmployeeTagsUpdater,
  EmployeePhoneNumberUpdater,
  EmployeePersonalEmailUpdater,
  EmployeeCompanyEmailUpdater,
  EmployeeSalaryUpdater,
  EmployeeSalaryTypeUpdater,
  EmployeeEffectiveDateUpdater,
  EmployeeBirthDateUpdater
];
