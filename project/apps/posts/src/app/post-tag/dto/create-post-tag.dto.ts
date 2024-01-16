import { ApiProperty } from '@nestjs/swagger';

export class CreatePostTagDTO {
  @ApiProperty({
    description: 'Uniq tag name',
    example: 'Weather'
  })
  public title: string;
}
