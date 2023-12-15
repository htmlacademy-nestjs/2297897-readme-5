import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_USERS_FILEPATH } from './config-users.const';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [],
      envFilePath: ENV_USERS_FILEPATH,
    })
  ]
})
export class ConfigUsersModule {}
