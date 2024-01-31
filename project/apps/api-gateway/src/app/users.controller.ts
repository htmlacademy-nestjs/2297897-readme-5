import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Req, UseFilters } from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDTO } from './dto/login-user.dto';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { CreateUserDTO } from './dto/create-user.dto';
import { Request } from 'express';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { JWT_ACCESS_HEADER, JWT_REFRESH_HEADER } from './api-gateway.const';

@ApiTags('users')
@UseFilters(AxiosExceptionFilter)
@Controller('users')
export class UsersController {
  constructor(
    private readonly httpService: HttpService,
  ) { }

  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'User with this email already exists.' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The new user has been successfully created.'})
  @Post('/register')
  public async register(@Body() dto: CreateUserDTO) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/register`, dto);
    return data;
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'User has been successfully logged.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User with this email not exists' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Password or login is wrong.' })
  @Post('/login')
  public async login(@Body() dto: LoginUserDTO) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, dto);
    return data;
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Get a new access/refresh tokens' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Need a refresh JWT token' })
  @ApiHeader(JWT_REFRESH_HEADER)
  @Post('/refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
      headers: { 'Authorization': req.headers['authorization'] }
    });
    return data;
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'User founded.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  @ApiHeader(JWT_ACCESS_HEADER)
  @Get('/:id')
  public async show(@Param('id') id: string, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}`, {
      headers: { 'Authorization': req.headers['authorization'] }
    });
    const userPosts = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Posts}/?userId=${id}`);
    data.postsCount = userPosts.data.totalItems;

    if(data.avatarUrl) {
      const userAvatar = await this.httpService.axiosRef.get(`${ApplicationServiceURL.FileVault}/${data.avatarUrl}`);
      data.avatarUrl = userAvatar.data;
    }

    return data;
  }


  @ApiResponse({ status: HttpStatus.OK, description: 'Password successfully changed' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'You must be authorized before changing password' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'You passed wrong old password' })
  @ApiHeader(JWT_ACCESS_HEADER)
  @Patch('/:id')
  public async changePassword(@Param('id') id: string, @Body() dto: ChangePasswordDTO, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Users}/${id}`,
      dto,
      { headers: { 'Authorization': req.headers['authorization'] } }
    );
    return data;
  }
}
