// src/orgs/entities/org.entity.ts
import { MembershipEntity } from 'src/membership/entities/membership.entity';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('orgs')
export class OrgEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  orgname: string;

  // FK живёт на стороне Membership → тут только обратная связь
  @OneToMany(() => MembershipEntity, (m) => m.org)
  memberships: MembershipEntity[];

  @OneToMany(() => TaskEntity, (t) => t.org)
  tasks: TaskEntity[];
}