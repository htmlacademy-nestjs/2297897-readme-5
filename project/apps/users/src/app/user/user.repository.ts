import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/libs/shared/core';
import { UserEntity } from './user.entity';

@Injectable()
export class UserMemoryRepository extends BaseMemoryRepository<UserEntity> {
   public async findByEmail(email: string): Promise<UserEntity | null> {
    const users = Array.from(this.entities.values());
    return users.find((user) => user.email === email) ?? null;
  }
}
