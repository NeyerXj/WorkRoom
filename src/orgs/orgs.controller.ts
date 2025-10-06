import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrgsService } from './orgs.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateOrg } from './dto/create-org.dto';
import { AddUserToOrgDto } from './dto/add-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('orgs')
@Controller('orgs')
export class OrgsController {
  constructor(private readonly orgsService: OrgsService) {}

  @UseGuards(AuthGuard)
  @Get('all')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Список организаций пользователя' })
  @ApiResponse({ status: 200, description: 'Массив организаций' })
  async getAllWhereMe(@CurrentUser('id') id: string){
    return await this.orgsService.getAllOrg(id)
  }

  @UseGuards(AuthGuard)
  @Post('create')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Создать организацию' })
  @ApiResponse({ status: 201, description: 'Организация создана' })
  async createOrg(@CurrentUser('id') id: string, @Body() dto: CreateOrg){
    return await this.orgsService.createOrg(id, dto)
  }

  @UseGuards(AuthGuard)
  @Post('add-user')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Добавить пользователей в организацию' })
  @ApiResponse({ status: 200, description: 'Пользователи добавлены' })
  async addUserToOrg(@CurrentUser('id') currentUsr: string,@Body() dto: AddUserToOrgDto){
    const {orgId, usersId, role} = dto
    return await this.orgsService.addUseerToOrg(currentUsr,orgId, usersId, role)
  }

  @UseGuards(AuthGuard)
  @Get('get-org')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Получить организацию' })
  @ApiResponse({ status: 200, description: 'Данные организации' })
  async getOrg(@CurrentUser('id') id: string, @Param('orgId') orgId: string){
    return await this.orgsService.getOrgById(id, orgId)
  }
}
