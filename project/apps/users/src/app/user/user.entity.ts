import { AuthUser } from '@project/libs/shared/types';
import { Entity } from '@project/libs/shared/core';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './user.constant';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserEntity implements AuthUser, Entity<string>{
  public id: string;
  public name: string;
  public email: string;
  public passwordHash: string;
  public avatarUrl: string;

  constructor(user: AuthUser) {
    this.populate(user);
  }

  public populate(user: AuthUser): void {
    this.email = user.email;
    this.name = user.name;
    this.avatarUrl = user.avatarUrl;
    this.passwordHash = user.passwordHash;
  }

  public serialize() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      passwordHash: this.passwordHash,
      avatarUrl: this.avatarUrl,
    }
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
