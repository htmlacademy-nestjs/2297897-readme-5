import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJWTOptions } from '@project/libs/shared/config/users';
import { JWTAccessStrategy } from './strategies/jwt-access.strategy';
import { NotifyModule } from '../notify/notify.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JWTRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJWTOptions
    }),
    NotifyModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JWTAccessStrategy,
    JWTRefreshStrategy,
    LocalStrategy
  ],
})
export class AuthModule {}
