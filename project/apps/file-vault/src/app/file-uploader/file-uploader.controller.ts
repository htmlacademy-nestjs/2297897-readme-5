import 'multer';
import { FileUploaderService } from './file-uploader.service';
import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { fillDTO } from '@project/libs/shared/helpers';
import { UploadedFileRDO } from './rdo/uploaded-file.rdo';

@Controller('files')
export class FileUploaderController {
  constructor(
    private readonly fileUploaderService: FileUploaderService,
  ) { }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileEntity = await this.fileUploaderService.saveFile(file);
    return fillDTO(UploadedFileRDO, fileEntity.serialize());
  }

  @Get('/:id')
  public async getFile(@Param('id') id: string) {
    const existsFile = await this.fileUploaderService.getFile(id);
    return fillDTO(UploadedFileRDO, existsFile.serialize())
  }
}
