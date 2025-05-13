
import { Injectable } from '@nestjs/common';
import { AppLogger } from '@app/logger';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly logger: AppLogger
  ) {}

  @CacheKey('user_by_id')
  @CacheTTL(120)
  async getUser(userId: string) {
    this.logger.log('Get user from auth service over tcp.');
    return this.userRepo.findById(userId);
  }

  async getUsers() {
    this.logger.log('Get users from auth service over tcp.');
    return this.userRepo.findAll();
  }

  async register(dto: CreateUserDto) {
    this.logger.log('Create user using auth service over tcp.');
    return this.userRepo.registerUser(dto);
  }

  async login(dto: LoginUserDto) {
    this.logger.log('Login user using auth service over tcp.');
    return this.userRepo.loginUser(dto);
  }
}
