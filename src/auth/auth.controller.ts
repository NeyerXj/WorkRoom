import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь зарегистрирован' })
  async register(@Body() dto: RegisterDto){
    return this.authService.register(dto.email, dto.password);
  }
  @Post('login')
  @ApiOperation({ summary: 'Логин пользователя' })
  @ApiResponse({ status: 200, description: 'Успешная авторизация и выдача токена' })
  async login(@Body() dto: LoginDto){
    return this.authService.login(dto.email, dto.password)
  }
  @UseGuards(AuthGuard)
  @Get('@me')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Текущий пользователь' })
  @ApiResponse({ status: 200, description: 'Возвращает идентификатор текущего пользователя' })
  myId(@CurrentUser('id') userId: string) {
    return { userId };
  }
}
