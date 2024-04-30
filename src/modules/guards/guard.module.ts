import { Global, Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { CryptoService } from '../../utils/crypto';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../../config/config.type';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from '../users/entities/user.entity';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        secret: configService.getOrThrow('auth.jwtSecret', {
          infer: true,
        }),
        signOptions: {
          expiresIn: configService.getOrThrow('auth.jwtAccessTokenExpiration', {
            infer: true,
          }),
        },
      }),
      inject: [ConfigService],
    }),
    // TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthGuard, CryptoService, JwtService],
  exports: [AuthGuard, CryptoService],
})
export class GuardsModule {}
