import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { OrgsService } from 'src/orgs/orgs.service';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskEntity) private readonly taskRep:Repository<TaskEntity>,
    private readonly orgRep: OrgsService) {}

    async createTask(userId:string, dto: CreateTaskDto){
        const {title, description, orgId, isCompleted} = dto
        const org = await this.orgRep.getOrgById(userId, orgId)
        const task = await this.taskRep.create({title, description, completed: isCompleted, createdBy: userId, org})
        await this.taskRep.save(task)
        return {id: task.id, title: task.title, description: task.description, completed: task.completed, createdAt: task.createdAt}
    }

    async getTasksByOrg(userId: string, orgId: string){
        const org = await this.orgRep.getOrgById(userId, orgId)
        return await this.taskRep.find({where: {org: {id: org.id}}})
    }

    async deleteTask(userId: string, taskId: string){
        const task = await this.taskRep.findOne({where: {id: taskId}})
        if(!task) throw new NotFoundException('Task not found')
        if(task.createdBy != userId) throw new NotFoundException('You are not authorized to delete this task')
        await this.taskRep.delete({id: taskId})
        return {message: 'Task deleted successfully'}
    }
    
    async updateTask(userId: string, taskId: string, dto: UpdateTaskDto){
        const task = await this.taskRep.findOne({where: {id: taskId}})
        if(!task) throw new NotFoundException('Task not found')
        if(task.createdBy != userId) throw new NotFoundException('You are not authorized to update this task')
        const {title, description, isCompleted} = dto
        task.title = title ?? task.title
        task.description = description ?? task.description
        task.completed = isCompleted ?? task.completed
        await this.taskRep.save(task)
        return {id: task.id, title: task.title, description: task.description, completed: task.completed, createdAt: task.createdAt}
    }
}
