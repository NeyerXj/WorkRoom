import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipEntity } from './entities/membership.entity';
import { OrgEntity } from 'src/orgs/entities/org.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { OrgsModule } from 'src/orgs/orgs.module';

@Module({
    imports: [
    TypeOrmModule.forFeature([MembershipEntity, OrgEntity, UserEntity]),
    UsersModule,   // ← чтобы инжектить UsersService// ← только forFeature
  ],
  controllers: [MembershipController],
  providers: [MembershipService],
  exports: [MembershipService]
})
export class MembershipModule {}
