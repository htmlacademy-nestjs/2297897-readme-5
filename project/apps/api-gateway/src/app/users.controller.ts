import { Body, Controller, Get, Param, Patch, Post, Req, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDTO } from './dto/login-user.dto';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceUrl } from './app.config';
import { CreateUserDTO } from './dto/create-user.dto';
import { Request } from 'express';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';

@ApiTags('users')
@UseFilters(AxiosExceptionFilter)
@Controller('users')
export class UsersController {
  constructor(
    private readonly httpService: HttpService,
  ) { }

  @Post('/register')
  public async register(@Body() dto: CreateUserDTO) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceUrl.Users}/register`, dto);
    return data;
  }

  @Post('/login')
  public async login(@Body() dto: LoginUserDTO) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceUrl.Users}/login`, dto);
    return data;
  }

  @Post('/refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceUrl.Users}/refresh`, null, {
      headers: { 'Authorization': req.headers['authorization'] }
    });
    return data;
  }

  @Get(':id')
  public async show(@Param('id') id: string, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceUrl.Users}/${id}`, {
      headers: { 'Authorization': req.headers['authorization'] }
    });
    return data;
  }

  @Patch('/:id')
  public async changePassword(@Param('id') id: string, @Body() dto: ChangePasswordDTO, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.patch(
      `${ApplicationServiceUrl.Users}/${id}`,
      dto,
      { headers: { 'Authorization': req.headers['authorization'] } }
    );
    return data;
  }
}
