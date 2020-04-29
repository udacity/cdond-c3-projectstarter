import { Injectable } from '@nestjs/common';
// import { JwtPayload } from '../auth/jwt-payload.interface';

@Injectable()
export class AppService {
  // root(user: JwtPayload): string {
  root(): string {
    return `Hello`;
  }
}
