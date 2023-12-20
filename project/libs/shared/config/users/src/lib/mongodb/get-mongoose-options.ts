import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { getMongoConnectionString } from '@project/libs/shared/helpers';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>('database.user'),
          password: config.get<string>('database.password'),
          host: config.get<string>('database.host'),
          port: config.get<string>('database.port'),
          databaseName: config.get<string>('database.name'),
          authDatabase: config.get<string>('database.authBase'),
        })
      };
    },
    inject: [ConfigService],
  }
}
