import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { OrgsService } from 'src/orgs/orgs.service';

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
}
