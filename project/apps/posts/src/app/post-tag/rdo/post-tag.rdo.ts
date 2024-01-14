import { Expose } from 'class-transformer';

export class PostTagRDO {
  @Expose()
  public id: string;
  @Expose()
  public title: string;
}
