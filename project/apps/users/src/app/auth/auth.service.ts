import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from '../user/user.entity';
import { AuthErrorMessage } from './auth.messages';
import { LoginUserDTO } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  public async register(dto: CreateUserDTO): Promise<UserEntity> {
    const { name, email, password, avatarUrl } = dto;

    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthErrorMessage.USER_EXISTS_CONFLICT);
    }

    const userEntity = await new UserEntity({
      name,
      email,
      avatarUrl: avatarUrl ?? '',
      passwordHash: ''
    }).setPassword(password);

    return this.userRepository.save(userEntity);
  }

  public async verifyUser(dto: LoginUserDTO): Promise<UserEntity> {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthErrorMessage.USER_NOT_EXISTS);
    }

    if (! await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AuthErrorMessage.WRONG_PASSWORD);
    }

    return existUser;
  }

  public async getUser(id: string): Promise<UserEntity> {
    const existsUser = await this.userRepository.findById(id);

    if(!existsUser) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }

    return existsUser;
  }
}
