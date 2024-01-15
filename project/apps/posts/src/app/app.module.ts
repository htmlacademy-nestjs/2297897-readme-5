import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/libs/shared/posts/models';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostTagModule } from './post-tag/post-tag.module';

@Module({
  imports: [
    PrismaClientModule,
    PostTagModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
