import { Injectable } from '@nestjs/common';
import { NetworkingService } from '@app/networking';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRto } from './rto/user.rto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly networkingService: NetworkingService) {}

  async findById(userId: string): Promise<UserRto | null> {
    return this.networkingService.send('auth_get_user', { userId }).toPromise();
  }

  async findAll(): Promise<Array<UserRto> | null> {
    return this.networkingService.send('auth_get_users', {}).toPromise();
  }

  async registerUser(dto: CreateUserDto): Promise<UserRto> {
    return this.networkingService.send('auth_register', dto).toPromise();
  }

  async loginUser(dto: LoginUserDto): Promise<{ access_token: string }> {
    return this.networkingService.send('auth_login', dto).toPromise();
  }
}
