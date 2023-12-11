import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { fillDTO } from '@project/libs/shared/helpers';
import { LoginUserDTO } from './dto/login-user.dto';
import { UserRDO } from './rdo/user.rdo';
import { LoggedUserRDO } from './rdo/logged-user.rdo';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('register')
  public async create(@Body() dto: CreateUserDTO) {
    const newUser = await this.authService.register(dto);
    return fillDTO(LoggedUserRDO, newUser.serialize())
  }

  @Post('login')
  public async login(@Body() dto: LoginUserDTO) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return fillDTO(UserRDO, verifiedUser.serialize());
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.authService.getUser(id);
    return fillDTO(UserRDO, existUser.serialize());
  }

}
