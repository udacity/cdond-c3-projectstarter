import { JoiCommandValidator } from '../../../../../common/commands/validation';
import { CreateOrder } from '../../createOrder';
import * as joi from '@hapi/joi';

export class CheckPropertiesValue extends JoiCommandValidator<CreateOrder> {
  getSchema(command: CreateOrder) {
    return joi.object({
      productId: joi
        .string()
        .uuid({ version: 'uuidv4' })
        .required(),
      productQuantity: joi
        .number()
        .required()
        .min(0),
      userId: joi.string().required(),
    });
  }
}
