import { ApiProperty } from '@nestjs/swagger';

export class FindTitleDTO {
  @ApiProperty({
    description: 'Query to title',
    example: 'Минимальная'
  })
  public queryString: string;
}
