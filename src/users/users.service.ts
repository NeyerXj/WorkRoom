import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly usersRep: Repository<UserEntity>) {}

    async getUserById(userId: string){
        const user = await this.usersRep.findOne({where:{
            id: userId
        }})
        if(!user) throw new NotFoundException('User not found');
        return user;
    }
    async getCurrentTime(){
        const res = await fetch('http://worldtimeapi.org/api/timezone/Etc/UTC');
        if(!res.ok) throw new NotFoundException('Could not fetch time');
        const data = await res.json();
        return {utc_datetime: data.utc_datetime, timezone: data.timezone, client: data.client_ip};
    }
}
