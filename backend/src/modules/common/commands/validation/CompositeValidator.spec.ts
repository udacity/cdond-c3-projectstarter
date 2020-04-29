import { CompositeValidator } from './CompositeValidator';
import { ICommandValidator } from './ICommandValidator';
import { ICommand } from '../ICommand';
import { IValidationResult } from './IValidationResult';
import { IValidationError } from './IValidationError';

describe('Composite Validator', () => {
  const mockResult: IValidationResult = {
    hasError: true,
    errors: [
      {
        value: 'val',
        fieldLabel: 'lable',
        field: 'field',
        message: 'message',
      },
    ],
  };

  const mockValidResult: IValidationResult = {
    hasError: false,
    errors: [],
  };

  const MockValidator = jest.fn<ICommandValidator<ICommand>, []>(() => ({
    validate: jest.fn().mockResolvedValue(mockResult),
  }));

  const MockValidValidator = jest.fn<ICommandValidator<ICommand>, []>(() => ({
    validate: jest.fn().mockResolvedValue(mockValidResult),
  }));

  describe('When validating with multiple validators', () => {
    it('should aggregate errors of the validators', async () => {
      const mockValidator = new MockValidator();
      const compositeValidator = new CompositeValidator<ICommand>([
        mockValidator,
        mockValidator,
      ]);
      const result = await compositeValidator.validate({});

      expect(result.hasError).toBeTruthy();
      expect(result.errors).toMatchObject([
        mockResult.errors[0],
        mockResult.errors[0],
      ]);
    });
    it('should return no error if any result is error occur', async () => {
      const mockValidator = new MockValidValidator();
      const compositeValidator = new CompositeValidator<ICommand>([
        mockValidator,
        mockValidator,
      ]);

      const result = await compositeValidator.validate({});

      expect(result.hasError).toBeFalsy();
      expect(result.errors).toMatchObject([]);
    });
  });
});
