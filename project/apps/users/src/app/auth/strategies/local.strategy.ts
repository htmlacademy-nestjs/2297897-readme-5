import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { USERNAME_FIELD_NAME } from './strategies.const';
import { User } from '@project/libs/shared/types';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
  ) {
    super({ usernameField: USERNAME_FIELD_NAME })
  }

  public async validate(email: string, password: string): Promise<User> {
    return this.authService.verifyUser({email, password});
  }
}
