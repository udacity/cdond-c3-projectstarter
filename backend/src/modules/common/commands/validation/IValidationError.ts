export interface IValidationError {
  message: string;
  field: string;
  fieldLabel: string;
  value: string | number | boolean;
}
