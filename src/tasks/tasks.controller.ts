import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

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
  @Delete('delete/:taskId')
  @UseGuards(AuthGuard)
  async deleteTask(@CurrentUser('id') id: string, @Param('taskId') taskId: string){
    if(!taskId) throw new NotFoundException('TaskId is required')
    return await this.tasksService.deleteTask(id, taskId)
  }
  @Put('update/:taskId')
  @UseGuards(AuthGuard)
  async updateTask(@CurrentUser('id') id: string, @Param('taskId') taskId: string, @Body() dto: UpdateTaskDto){
    if(!taskId) throw new NotFoundException('TaskId is required')
    return await this.tasksService.updateTask(id, taskId, dto)
  }
}
