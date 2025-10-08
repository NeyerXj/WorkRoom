import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiAcceptedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Test: Get current server time' })
  @Get('time')
  async getCurrentTime() {
    return this.usersService.getCurrentTime();
  }
  @Get('products')
  @ApiOperation({ summary: 'Test:Get all products from json' })
  async getProducts(){
    return this.usersService.getProducts();
  }
  @Get('products/:category')
  @ApiOperation({ summary: 'Test:Get products by category from json' })
  @ApiAcceptedResponse({ description: 'Products by category' })
  async getByCategory(@Param('category') category: string){
    if (!category) throw new NotFoundException('Category is required');
    return this.usersService.getByCategory(category);
  }
}
