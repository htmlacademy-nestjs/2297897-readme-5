import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import fileVaultConfig from './file-vault.config';
import { ENV_FILE_PATH } from './file-vault.const';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [fileVaultConfig],
      envFilePath: ENV_FILE_PATH
    })
  ]
})
export class FileVaultConfigModule { }
