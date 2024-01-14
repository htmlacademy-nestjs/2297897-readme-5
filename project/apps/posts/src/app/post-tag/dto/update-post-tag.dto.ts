import { ApiProperty } from "@nestjs/swagger";

export class UpdatePostTagDTO {
  @ApiProperty({
    description: 'Uniq tag name',
    example: 'Weather'
  })
  public title: string;
}
