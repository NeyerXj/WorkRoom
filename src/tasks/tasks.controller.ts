import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { NotFoundError } from 'rxjs';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createTask(@CurrentUser('id') id: string, @Body()dto: CreateTaskDto){
    return await this.tasksService.createTask(id, dto)
  }
  @Get('get-all/:orgId')
  @UseGuards(AuthGuard)
  async getTasksByOrg(@CurrentUser('id') id: string, @Param('orgId') orgId: string){
    if(!orgId) throw new NotFoundException('OrgId is required')
    return await this.tasksService.getTasksByOrg(id, orgId)
  }
}
