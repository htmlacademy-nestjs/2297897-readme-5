import {
  ConflictException, HttpException, HttpStatus,
  Inject,
  Injectable, Logger, NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from '../user/user.entity';
import { AUTH_ERROR_MESSAGE } from './auth.messages';
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Token, TokenPayload, User } from '@project/libs/shared/types';
import { jwtConfig } from '@project/libs/shared/config/users';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
  ) { }

  public async register(dto: CreateUserDTO): Promise<UserEntity> {
    const { name, email, password, avatarUrl } = dto;

    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_ERROR_MESSAGE.USER_EXISTS_CONFLICT);
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
      throw new NotFoundException(AUTH_ERROR_MESSAGE.USER_NOT_EXISTS);
    }

    if (! await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGE.WRONG_PASSWORD);
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

  public async getUserByEmail(email: string) {
    const existsUser = await this.userRepository.findByEmail(email);

    if(!existsUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existsUser;
  }

  public async createUserToken(user: User): Promise<Token> {
    const accessTokenPayload: TokenPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl
    };
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.generateAccessToken(accessTokenPayload),
        this.generateRefreshToken(refreshTokenPayload),
      ]);

      return { accessToken, refreshToken };
    } catch(error) {
      this.logger.error(`[Token generation error]: ${error.message}`);
      throw new HttpException('An error occurred during token creation', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async generateAccessToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  public async generateRefreshToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.jwtOptions.refreshTokenSecret,
      expiresIn: this.jwtOptions.refreshTokenExpiresIn,
    });
  }
}
