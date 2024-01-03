import { Controller, Body, Post, Get, Param, HttpStatus } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { fillDTO } from '@project/libs/shared/helpers';
import { LoginUserDTO } from './dto/login-user.dto';
import { UserRDO } from './rdo/user.rdo';
import { LoggedUserRDO } from './rdo/logged-user.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
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
    return fillDTO(LoggedUserRDO, verifiedUser.serialize());
  }

  //TODO: Добавить кейс NOT_FOUND
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.OK,
    description: 'User founded.'
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.authService.getUser(id);
    return fillDTO(UserRDO, existUser.serialize());
  }

}
