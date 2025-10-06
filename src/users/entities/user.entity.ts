import { MembershipEntity } from "src/membership/entities/membership.entity";
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity('users')
@Unique(['email'])
export class UserEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column({type: 'varchar', length: 255})
    email: string

    @Column({ type: 'varchar', length: 255 }) passwordHash: string;

    @CreateDateColumn() createdAt: Date;
    @UpdateDateColumn() updatedAt: Date;

    
}