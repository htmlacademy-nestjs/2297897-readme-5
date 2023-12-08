import { AuthUser } from '@project/libs/shared/shared-types';
import { Entity } from '@project/libs/shared/core';
import { genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './user.constant';

export class UserEntity implements AuthUser, Entity<string>{
  public id?: string;
  public name: string;
  public email: string;
  public avatarUrl: string;
  public passwordHash: string;
  public createdAt: Date;

  constructor(user: AuthUser) {
    this.populate(user);
  }

  public toPOJO() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      avatarUrl: this.avatarUrl,
      passwordHash: this.passwordHash,
      createdAt: new Date()
    }
  }

  public populate(data: AuthUser) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.avatarUrl = data.avatarUrl;
    this.createdAt = data.createdAt;
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }
}
