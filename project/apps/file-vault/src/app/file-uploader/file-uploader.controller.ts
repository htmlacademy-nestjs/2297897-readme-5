import 'multer';
import { FileUploaderService } from './file-uploader.service';
import { Controller, Get, HttpStatus, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { fillDTO } from '@project/libs/shared/helpers';
import { UploadedFileRDO } from './rdo/uploaded-file.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('files')
@Controller('files')
export class FileUploaderController {
  constructor(
    private readonly fileUploaderService: FileUploaderService,
  ) { }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UploadedFileRDO,
    description: 'File successfully created'
  })
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileEntity = await this.fileUploaderService.saveFile(file);
    return fillDTO(UploadedFileRDO, fileEntity.serialize());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: UploadedFileRDO,
    description: 'File successfully found'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'File with this id not found'
  })
  @Get('/:id')
  public async getFile(@Param('id') id: string) {
    const existsFile = await this.fileUploaderService.getFile(id);
    return fillDTO(UploadedFileRDO, existsFile.serialize())
  }
}
