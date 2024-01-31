import { User } from './user.interface';

export interface TokenPayload extends User {
  sub: string,
  email: string,
  name: string,
  avatarUrl: string
}
