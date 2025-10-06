import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembershipEntity, OrgRole } from './entities/membership.entity';
import { Repository } from 'typeorm';
import { MembershipCreateDto } from './dto/create-membership.dto';
import { UsersService } from 'src/users/users.service';
import { OrgsService } from 'src/orgs/orgs.service';

@Injectable()
export class MembershipService {
    constructor(@InjectRepository(MembershipEntity) private readonly mebmerRep: Repository<MembershipEntity>,
    private readonly userService: UsersService){}

    async addOwner(orgId: string, userId: string) {
    const user = await this.userService.getUserById(userId);
  await this.mebmerRep.upsert(
    { orgId, userId, userEmail: user.email, role: OrgRole.owner },
    ['orgId', 'userId'], // уникальный ключ
  );
}

async addMembers(orgId: string, userIds: string[], role: OrgRole) {
    const users = await Promise.all(userIds.map(id => this.userService.getUserById(id)));
    const memberships = users.map(user => ({
      orgId,
      userId: user.id,
      userEmail: user.email,
      role,
    }));
    await this.mebmerRep.upsert(memberships, ['orgId', 'userId']); // уникальный ключ
}

async checkRulesInOrg(orgId: string, userId: string) {
    const membership = await this.mebmerRep.findOne({where: {orgId, userId}})
    if(!membership) {
      console.log('no membership')
      return false}
    if(membership.role === OrgRole.member) {
      console.log(membership)
      console.log(orgId)
      return false}
      console.log('ok')
    return true
}
    async getMembersInOrg(orgId: string) {
        return await this.mebmerRep.find({where: {orgId}})
    }

}
