import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDTO } from './dto/login-user.dto';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceUrl } from './app.config';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly httpService: HttpService,
  ) { }

  public async login(@Body() dto: LoginUserDTO) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceUrl.Users}/login`, dto);
    return data;
  }
 }
