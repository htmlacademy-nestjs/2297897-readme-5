import 'multer';
import { HttpService } from '@nestjs/axios';
import { Controller, Get, HttpStatus, Param, Post, UploadedFile, UseFilters, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { UploadedFileRDO } from './rdo/uploaded-file.rdo';
import { ApplicationServiceURL } from './app.config';

@ApiTags('files')
@Controller('files')
@UseFilters(AxiosExceptionFilter)
export class FileVaultController {
  constructor(
    private readonly httpService: HttpService,
  ) { }

  @ApiResponse({ status: HttpStatus.CREATED, type: UploadedFileRDO, description: 'File successfully created' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Post('/upload')
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const formData = new FormData();
    formData.set('file', new Blob([file.buffer], {
      type: file.mimetype
    }), file.originalname);

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.FileVault}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return data;
  }

  @ApiResponse({ status: HttpStatus.OK, type: UploadedFileRDO, description: 'File successfully found' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'File with this id not found' })
  @Get('/:id')
  public async getFile(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.FileVault}/${id}`);
    return data;
  }
}
