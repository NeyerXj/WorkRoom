import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Проверка работоспособности' })
  @ApiResponse({ status: 200, description: 'Возвращает приветствие' })
  getHello(): string {
    return this.appService.getHello();
  }
}
