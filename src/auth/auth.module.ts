import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthStrategy } from '../strategies/jwt-auth.strategy';
import { LocalAuthStrategy } from '../strategies/local-auth.strategy';
import { RedisModule } from '../redis/redis.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    JwtModule.register({}),
    RedisModule,
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthStrategy, LocalAuthStrategy],
})
export class AuthModule {}
