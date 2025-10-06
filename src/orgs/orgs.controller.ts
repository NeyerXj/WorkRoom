import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrgsService } from './orgs.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateOrg } from './dto/create-org.dto';
import { AddUserToOrgDto } from './dto/add-user.dto';

@Controller('orgs')
export class OrgsController {
  constructor(private readonly orgsService: OrgsService) {}

  @UseGuards(AuthGuard)
  @Get('all')
  async getAllWhereMe(@CurrentUser('id') id: string){
    return await this.orgsService.getAllOrg(id)
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async createOrg(@CurrentUser('id') id: string, @Body() dto: CreateOrg){
    return await this.orgsService.createOrg(id, dto)
  }

  @UseGuards(AuthGuard)
  @Post('add-user')
  async addUserToOrg(@CurrentUser('id') currentUsr: string,@Body() dto: AddUserToOrgDto){
    const {orgId, usersId, role} = dto
    return await this.orgsService.addUseerToOrg(currentUsr,orgId, usersId, role)
  }

  @UseGuards(AuthGuard)
  @Get('get-org')
  async getOrg(@CurrentUser('id') id: string, @Param('orgId') orgId: string){
    return await this.orgsService.getOrgById(id, orgId)
  }
}
