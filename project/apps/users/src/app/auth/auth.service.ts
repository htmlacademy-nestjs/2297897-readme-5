import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserMemoryRepository } from '../user/user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from '../user/user.entity';
import { AuthErrorMessage } from './auth.constant';
import { LoginUserDTO } from './dto/login-user.dto';
import { AuthUser } from '@project/libs/shared/shared-types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserMemoryRepository,
  ) { }

  public async register(dto: CreateUserDTO): Promise<AuthUser> {
    const { name, email, password, avatarUrl } = dto;

    const existsUser = await this.userRepository.findByEmail(email);

    if (existsUser) {
      throw new ConflictException(AuthErrorMessage.USER_EXISTS_CONFLICT);
    }

    const userEntity = await new UserEntity({
      name,
      email,
      avatarUrl,
      passwordHash: ''
    }).setPassword(password);

    return this.userRepository.save(userEntity);
  }

  public async verifyUser(dto: LoginUserDTO): Promise<AuthUser> {
    const { email, password } = dto;
    const existsUser = await this.userRepository.findByEmail(email);
    if (!existsUser) {
      throw new NotFoundException(AuthErrorMessage.USER_NOT_EXISTS);
    }
    const userEntity = new UserEntity(existsUser);

    if (! await userEntity.comparePassword(password)) {
      throw new UnauthorizedException(AuthErrorMessage.WRONG_PASSWORD);
    }

    return userEntity.toPOJO();
  }

  public async getUser(id: string): Promise<AuthUser> {
    return this.userRepository.findById(id);
  }
}
