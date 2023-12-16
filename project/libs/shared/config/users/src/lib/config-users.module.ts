import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_USERS_FILEPATH } from './config-users.const';
import applicationConfig from './app.config';
import databaseConfig from './database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, databaseConfig],
      envFilePath: ENV_USERS_FILEPATH,
    })
  ]
})
export class ConfigUsersModule {}
