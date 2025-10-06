import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PasswordHasher } from './crypto/password-hasher.service';
import { SimpleJwtService } from './jwt/jwt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController], 
  providers: [AuthService, PasswordHasher, SimpleJwtService, AuthGuard],
  exports: [AuthGuard,SimpleJwtService],
})
export class AuthModule {}
