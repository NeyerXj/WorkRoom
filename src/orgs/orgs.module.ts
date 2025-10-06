import { Module } from '@nestjs/common';
import { OrgsService } from './orgs.service';
import { OrgsController } from './orgs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrgEntity } from './entities/org.entity';
import { UsersModule } from 'src/users/users.module';
import { MembershipModule } from 'src/membership/membership.module';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [TypeOrmModule.forFeature([OrgEntity]),UsersModule, MembershipModule, AuthModule],
  controllers: [OrgsController],
  providers: [OrgsService],
  exports: [OrgsService],
})
export class OrgsModule {}
