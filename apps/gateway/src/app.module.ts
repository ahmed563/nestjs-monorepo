
import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { HealthController } from './health.controller';
import { UserService } from './user/user.service';
import { AuthModule } from '../../common/src/auth/auth.module';
import { NetworkingModule } from '@app/networking';
import { TerminusModule } from '@nestjs/terminus';
import { LoggerModule } from '@app/logger';
import { ThrottlerModule } from '@nestjs/throttler';
import { HttpModule } from '@nestjs/axios';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserRepository } from './user/user.repository';

@Module({
  imports: [
    AuthModule,
    LoggerModule,
    NetworkingModule,
    HttpModule,
    TerminusModule,
    CacheModule.register({
      ttl: 60,
      max: 100,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
  ],
  controllers: [UserController, HealthController],
  providers: [
    UserService,
    UserRepository,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
