import { OrgEntity } from "src/orgs/entities/org.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('tasks')
export class TaskEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ManyToOne(() => OrgEntity, (o) => o.tasks, {onDelete: 'CASCADE'})
    org: OrgEntity;
    @Column({type:'varchar', length: 255})
    title: string;
    @Column({type:'text', nullable: true})
    description: string;
    @Column({type:'boolean', default: false})
    completed: boolean;
    @Column('uuid', { name: 'user_id' })
    createdBy: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}