import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/libs/shared/core';
import { AuthUser } from '@project/libs/shared/shared-types';

@Injectable()
export class UserMemoryRepository extends BaseMemoryRepository<AuthUser> {
   public async findByEmail(email: string): Promise<AuthUser | null> {
    const users = Array.from(this.entities.values());
    return users.find((user) => user.email === email) ?? null;
  }
}
