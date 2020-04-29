import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'glee-jwks-rsa';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const issuer = `https://${process.env.AUTH0_DOMAIN}/`;
    const jwksUri = `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`;
    const audience = process.env.AUTH0_AUDIENCE;

    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer,
      aud: audience,
      algorithms: ['RS256'],
    });
  }

  validate(payload: JwtPayload): User {
    if (!payload) {
      throw new UnauthorizedException('Invalid JWT Token');
    }

    const user: User = {
      username: payload.sub,
    };
    return user;
  }
}
