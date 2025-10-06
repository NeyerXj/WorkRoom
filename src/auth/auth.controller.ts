import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto){
    return this.authService.register(dto.email, dto.password);
  }
  @Post('login')
  async login(@Body() dto: LoginDto){
    return this.authService.login(dto.email, dto.password)
  }
  @UseGuards(AuthGuard)
  @Get('@me')
  myId(@CurrentUser('id') userId: string) {
    return { userId };
  }
}
