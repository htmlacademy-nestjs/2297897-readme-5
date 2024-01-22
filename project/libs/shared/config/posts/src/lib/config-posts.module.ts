import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_POSTS_FILEPATH } from './config-posts.const';
import applicationConfig from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ENV_POSTS_FILEPATH,
      load: [applicationConfig]
    })
  ]
})
export class ConfigPostsModule { }
