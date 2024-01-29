import { Controller, Body, Post, Get, Param, HttpStatus, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { fillDTO } from '@project/libs/shared/helpers';
import { LoginUserDTO } from './dto/login-user.dto';
import { UserRDO } from './rdo/user.rdo';
import { LoggedUserRDO } from './rdo/logged-user.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MongoIDValidationPipe } from '@project/libs/shared/core';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { NotifyService } from '../notify/notify.service';

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
  @Post('login')
  public async login(@Body() dto: LoginUserDTO) {
    const verifiedUser = await this.authService.verifyUser(dto);
    const userToken = await this.authService.createUserToken(verifiedUser);
    return fillDTO(LoggedUserRDO, { ...verifiedUser.serialize(), ...userToken });
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
}
