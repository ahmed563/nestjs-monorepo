
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../../../common/src/auth/auth.module';
import { UserRepository } from './user.repository';

describe('UserService', () => {
  let service: UserService;
  let userId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [UserService, UserRepository, PrismaService],
    }).compile();
    service = module.get<UserService>(UserService);
  });

  it('should create a user', async () => {
    const user = await service.createUser({email: 'unit@example.com', password: 'unitpass', name: 'Unit Test'});
    expect(user).toHaveProperty('id');
    userId = user.id;
    expect(user.email).toBe('unit@example.com');
  });

  it('should get a user', async () => {
    const user = await service.findById(userId);
    expect(user?.id).toBe(userId);
    expect(user?.email).toBe('unit@example.com');
  });

  it('should get users', async () => {
    const user = await service.findAll();
    expect(user?.length).toBeGreaterThan(0);
  });
});
