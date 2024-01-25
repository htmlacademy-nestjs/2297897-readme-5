import { Module } from '@nestjs/common';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { FileVaultConfigModule, getMongooseOptions } from '@project/libs/shared/config/file-vault';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    FileUploaderModule,
    FileVaultConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
})
export class AppModule {}
