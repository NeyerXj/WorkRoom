// src/memberships/entities/membership.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { OrgEntity } from 'src/orgs/entities/org.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export enum OrgRole {
  owner = 'owner',
  manager = 'manager',
  member = 'member',
}

@Entity('memberships')
@Unique(['orgId', 'userId']) // один пользователь не может дублироваться в одной орг
export class MembershipEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: OrgRole })
  role: OrgRole;

  // ЯВНЫЕ FK — это важно
  @Column('uuid', { name: 'org_id' })
  orgId: string;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @ManyToOne(() => OrgEntity, (o) => o.memberships, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'org_id' })
  org: OrgEntity;

  @Column({ name: 'user_email', length: 255 })
  userEmail: string;
}