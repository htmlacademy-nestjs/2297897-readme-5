import { Module } from '@nestjs/common';
import { FileUploaderController } from './file-uploader.controller';
import { FileUploaderService } from './file-uploader.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';
import { SERVE_ROOT } from './file-uploader.const';

@Module({
  imports: [ServeStaticModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const rootPath = configService.get<string>('application.uploadDirectory');
      return [{
        rootPath,
        serveRoot: SERVE_ROOT,
      }]
    }
  })],
  controllers: [FileUploaderController],
  providers: [FileUploaderService],
})
export class FileUploaderModule { }
