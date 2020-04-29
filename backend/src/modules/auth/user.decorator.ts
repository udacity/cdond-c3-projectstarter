import { createParamDecorator } from '@nestjs/common';
export const Usr = createParamDecorator((_, req) => {
  return req.user;
});
