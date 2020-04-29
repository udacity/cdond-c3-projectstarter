import {
  ICommandValidator,
  IValidationResult,
} from '../../../../../common/commands/validation';
import { CreateOrder } from '../../createOrder';
import { ProductRepository } from '../../../repositories/productRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckProductExist implements ICommandValidator<CreateOrder> {
  constructor(private readonly productRepository: ProductRepository) {}

  async validate(command: CreateOrder): Promise<IValidationResult> {
    const queryResult = await this.productRepository
      .where({ id: command.productId })
      .get();

    if (queryResult.length > 0) {
      return {
        hasError: false,
        errors: [],
      };
    }
    return {
      hasError: true,
      errors: [
        {
          field: 'productId',
          fieldLabel: 'productId',
          message: 'The product is not valid',
          value: command.productId,
        },
      ],
    };
  }
}
