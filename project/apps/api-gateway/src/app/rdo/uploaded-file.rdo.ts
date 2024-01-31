import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UploadedFileRDO {
  @ApiProperty({
    description: 'Unique file ID',
    example: '11-22-33'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'File name before saving',
    example: 'testFile.png'
  })
  @Expose()
  public originalName: string;

  @ApiProperty({
    description: 'File name after saving on server',
    example: 'ff140166-5236-438e-8caa-c5d50e534587.png'
  })
  @Expose()
  public hashName: string;

  @ApiProperty({
    description: 'A subdirectory dividing uploaded files by year and month',
    example: '2024/01'
  })
  @Expose()
  public subDirectory: string;

  @ApiProperty({
    description: 'Uploaded file mimetype',
    example: 'text/plain'
  })
  @Expose()
  public mimetype: string;

  @ApiProperty({
    description: 'Uploaded file size',
    example: 41
  })
  @Expose()
  public size: number;

}
