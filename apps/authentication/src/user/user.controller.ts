
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { GetUserDto } from './dto/get-user.dto';
import { UserRto } from '../../../gateway/src/user/rto/user.rto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('auth_get_user')
  async getUser(@Payload() data: GetUserDto): Promise<UserRto | null> {
    return this.userService.findById(data.userId);
  }

  @MessagePattern('auth_get_users')
  async getUsers(): Promise<Array<UserRto> | null> {
    return this.userService.findAll();
  }

  @MessagePattern('auth_register')
  async register(@Payload() data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @MessagePattern('auth_login')
  async login(@Payload() dto: LoginUserDto) {
    return this.userService.validateUserAndSignToken(dto);
  }
}
