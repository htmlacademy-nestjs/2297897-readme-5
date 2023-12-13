import { Module } from '@nestjs/common';
import { UserMemoryRepository } from './user.repository';

@Module({
  providers: [UserMemoryRepository],
  exports: [UserMemoryRepository],
})
export class UserModule {}
