import { IValidationError } from './IValidationError';

export interface IValidationResult {
  hasError: boolean;
  errors: IValidationError[];
}
