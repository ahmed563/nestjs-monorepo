
import { Controller, Get, UseGuards, Req, Post, Body, HttpCode } from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/src/auth/jwt-auth.guard';
import { UserService } from './user.service';
import { UserRto } from './rto/user.rto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiTags('auth')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(ThrottlerGuard)
  @ApiResponse({ status: 200, description: 'User profile', type: UserRto })
  async getProfile(@Req() req) {
    return this.userService.getUser(req.user.userId);
  }

  @Get('users')
  @ApiTags('auth')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(ThrottlerGuard)
  @ApiResponse({ status: 200, description: 'Get users' })
  async getUsers() {
    return this.userService.getUsers();
  }

  @Post('register')
  @ApiTags('auth')
  @UseGuards(ThrottlerGuard)
  @ApiResponse({ status: 201, description: 'Register user', type: CreateUserDto })
  async register(@Body() dto: CreateUserDto): Promise<UserRto> {
    return this.userService.register(dto);
  }

  @Post('login')
  @ApiTags('auth')
  @UseGuards(ThrottlerGuard)
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Login user' })
  async login(@Body() dto: LoginUserDto) {
    return this.userService.login(dto); // returns JWT
  }
}
