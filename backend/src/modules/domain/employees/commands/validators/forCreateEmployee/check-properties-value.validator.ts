import { JoiCommandValidator } from '../../../../../common/commands/validation';
import { CreateEmployee } from '../../create-employee.command';
import * as joi from '@hapi/joi';

export class CheckPropertiesValue extends JoiCommandValidator<CreateEmployee> {
  getSchema(command: CreateEmployee) {
    return joi.object({
      firstName: joi.string().required(),
      middleName: joi
        .string()
        .allow('')
        .optional(),
      lastName: joi.string().required(),
      secondLastName: joi
        .string()
        .allow('')
        .optional(),
      displayName: joi
        .string()
        .allow('')
        .optional(),
      companyEmail: joi
        .string()
        .email()
        .required(),
      personalEmail: joi
        .string()
        .allow('')
        .email()
        .optional(),
      birthdate: joi
        .string()
        .isoDate()
        .required(),
      startDate: joi
        .string()
        .isoDate()
        .required(),
      address: joi
        .string()
        .allow('')
        .optional(),
      phoneNumber: joi
        .string()
        .allow('')
        .optional(),
      bankName: joi
        .string()
        .allow('')
        .optional(),
      accountNumber: joi
        .string()
        .allow('')
        .optional(),
      gender: joi.string().required(),
      tags: joi
        .string()
        .allow('')
        .optional(),
      country: joi.string().required(),
      region: joi.string().required(),
      city: joi.string().required(),
      salary: joi
        .string()
        .regex(/^\d+$/)
        .required(),
      effectiveDate: joi
        .string()
        .isoDate()
        .required(),
      salaryType: joi.string().required(),
    });
  }
}
