import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.log('contructor in jwt.strategy.ts');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET || 'defaultSecret',
    });
  }

  async validate(payload: any) {
    // Whatever you return here is appended to the request object (req.user)
    console.log("payload", payload);
    return { id: payload.id, name: payload.name, email: payload.email };
  }
}
