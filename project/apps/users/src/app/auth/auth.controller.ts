import { Controller, Body, Post, Get, Param, HttpStatus, UseGuards, Req, HttpCode, Patch } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { fillDTO } from '@project/libs/shared/helpers';
import { UserRDO } from './rdo/user.rdo';
import { LoggedUserRDO } from './rdo/logged-user.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MongoIDValidationPipe } from '@project/libs/shared/core';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { NotifyService } from '../notify/notify.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserEntity } from '../user/user.entity';
import { JWTRefreshGuard } from './guards/jwt-refresh.guard';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { RequestWithTokenPayload } from '@project/libs/shared/types';

interface RequestWithUser {
  user: UserEntity;
}

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly notifyService: NotifyService,
  ) { }

  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User with this email already exists.'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDTO) {
    const newUser = await this.authService.register(dto);

    await this.notifyService.registerSubscriber({
      email: newUser.email,
      name: newUser.name,
    })

    return fillDTO(UserRDO, newUser.serialize())
  }

  @ApiResponse({
    type: LoggedUserRDO,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User with this email not exists'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or login is wrong.'
  })
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    const userToken = await this.authService.createUserToken(user);
    return fillDTO(LoggedUserRDO, { ...user.serialize(), ...userToken });
  }

  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.OK,
    description: 'User founded.'
  })
  @UseGuards(JWTAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoIDValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    return fillDTO(UserRDO, existUser.serialize());
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  @UseGuards(JWTRefreshGuard)
  @Post('refresh')
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password successfully changed'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You must be authorized before changing password'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You passed wrong old password'
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JWTAuthGuard)
  @Patch('/:id')
  public async changePassword(@Param('id', MongoIDValidationPipe) id: string, @Body() dto: ChangePasswordDTO) {
    const updatedUser = await this.authService.changePassword(id, dto);
    return fillDTO(UserRDO, updatedUser.serialize())
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'You are authorized'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You are not authorized'
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JWTAuthGuard)
  @Post('check')
  public async checkToken(@Req() {user: payload}: RequestWithTokenPayload) {
    return payload;
  }
}
