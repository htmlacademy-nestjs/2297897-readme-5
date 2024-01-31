import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HTTP_CLIENT_AVAILABLE_VALUE } from './app.config';
import {ApiGatewayConfigModule} from '@project/libs/shared/config/api-gateway';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_AVAILABLE_VALUE.CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_AVAILABLE_VALUE.MAX_REDIRECTS,
    }),
    ApiGatewayConfigModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
