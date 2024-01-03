import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '@project/libs/shared/posts/models';

@Injectable()
export class AppService {
  constructor(
    private readonly prismaService: PrismaClientService
  ) { }

  getData() {
    return this.prismaService.post.findMany();
  }
}
