import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigUsersModule } from '@project/libs/shared/config/users';

@Module({
  imports: [AuthModule, UserModule, ConfigUsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
