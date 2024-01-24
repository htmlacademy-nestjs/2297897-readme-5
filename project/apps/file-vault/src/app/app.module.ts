import { Module } from '@nestjs/common';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { FileVaultConfigModule } from '@project/libs/shared/config/file-vault';

@Module({
  imports: [FileUploaderModule, FileVaultConfigModule],
})
export class AppModule {}
