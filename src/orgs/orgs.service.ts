import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrgEntity } from './entities/org.entity';
import { Repository } from 'typeorm';
import { CreateOrg } from './dto/create-org.dto';
import { UsersService } from 'src/users/users.service';
import { MembershipService } from 'src/membership/membership.service';
import { OrgRole } from 'src/membership/entities/membership.entity';

@Injectable()
export class OrgsService {
    constructor(@InjectRepository(OrgEntity) private readonly orgRep: Repository<OrgEntity>, 
    private readonly userService: UsersService,
    private readonly memberService: MembershipService){}

    async createOrg(userId: string, dto: CreateOrg){
        const {orgname, memberships} = dto

        const org = await this.orgRep.create({orgname})
        await this.orgRep.save(org)
        
        const user = await this.userService.getUserById(userId)

        await this.memberService.addOwner(org.id, user.id)

        return await this.orgRep.findOne({
            where: {
                id: org.id
            },
            relations: {
                memberships: true
            }
        })

    }

    async addUseerToOrg(cruser: string,orgId: string, usersId: string[], role?: OrgRole){
        const org = await this.orgRep.findOne({where: {id: orgId}})
        if(!org) throw new NotFoundException('Org not found')

        const check = await this.memberService.checkRulesInOrg(orgId, cruser)
        if(!check) throw new NotFoundException('You have no permission to add users to this org')

        await this.memberService.addMembers(orgId, usersId, role || OrgRole.member)

        return await this.orgRep.findOne({
            where: {
                id: org.id
            },
            relations: {
                memberships: true
            }
        })
    }

    async getAllOrg(userId: string){
        const user = await this.userService.getUserById(userId)
        if(!user) throw new NotFoundException('User not found')
        const orgs = await this.orgRep.find({
            where: {
                memberships: {
                    userId: user.id
                }
            },
            relations: {
                memberships: true
            }
        })
        return orgs
    }

    async getOrgById(userId: string, orgId: string){
        const user = await this.userService.getUserById(userId)
        if(!user) throw new NotFoundException('User not found')
        const userInOrg = await this.orgRep.findOne({
            where: {
                id: orgId,
                memberships: {
                    userId: user.id
                }
            },
            relations: {
                memberships: true
            }
        })
        if(!userInOrg) throw new NotFoundException('You are not a member of this org or org does not exist')
        const org = await this.orgRep.findOne({where:{
            id: orgId},relations: {
                memberships: true
            }})
            if(!org) throw new NotFoundException('Org not found')

        return org
        }
}
