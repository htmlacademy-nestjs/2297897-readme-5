import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { TokenPayload } from '@project/libs/shared/types';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JWTAccessStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.accessTokenSecret'),
    })
  }

  public async validate(payload: TokenPayload): Promise<TokenPayload> {
    return payload;
  }
}
