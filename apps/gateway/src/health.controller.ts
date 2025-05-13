import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck, MicroserviceHealthIndicator } from '@nestjs/terminus';
import { Transport } from '@nestjs/microservices';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
  ) {}

  @Get('/')
  index() {
    return { status: 'online' };
  }

  @Get('check')
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('gateway', 'http://localhost:3000/health'),
      () => this.microservice.pingCheck('auth-microservice', {
        transport: Transport.TCP,
        options: { host: 'localhost', port: 8877 },
      }),
    ]);
  }
}
