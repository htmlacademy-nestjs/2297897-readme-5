import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HTTP_CLIENT_AVAILABLE_VALUE } from './app.config';
import {ApiGatewayConfigModule} from '@project/libs/shared/config/api-gateway';
import { UsersController } from './users.controller';
import { CheckAuthGuard } from './guard/check-auth.guard';
import { FileVaultController } from './file-vault.controller';
import { PostsController } from './posts.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_AVAILABLE_VALUE.CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_AVAILABLE_VALUE.MAX_REDIRECTS,
    }),
    ApiGatewayConfigModule
  ],
  controllers: [
    UsersController,
    FileVaultController,
    PostsController
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}
