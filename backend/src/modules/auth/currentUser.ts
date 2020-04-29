import { REQUEST } from '@nestjs/core';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { Request } from 'express';
import { User } from './user.interface';

@Injectable({ scope: Scope.REQUEST })
export class CurrentUser {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  getUser(): User {
    return this.request.user;
  }
}
