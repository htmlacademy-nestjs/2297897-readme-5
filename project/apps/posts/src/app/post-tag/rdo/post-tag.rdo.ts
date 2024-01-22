import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PostTagRDO {
  @ApiProperty({
    description: 'Tag unique ID',
    example: '11-22-33'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Tag unique title',
    example: 'Weather'
  })
  @Expose()
  public title: string;
}
