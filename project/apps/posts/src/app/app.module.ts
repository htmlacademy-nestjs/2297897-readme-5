import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/libs/shared/posts/models';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PrismaClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
