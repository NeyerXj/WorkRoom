import { Controller } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('membership')
@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}
}
