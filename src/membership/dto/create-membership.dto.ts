import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { OrgRole } from "../entities/membership.entity";
import { ApiProperty } from '@nestjs/swagger';

export class MembershipCreateDto{
    @ApiProperty({ enum: OrgRole })
    @IsEnum(OrgRole)
    role: OrgRole

    @ApiProperty({ format: 'uuid' })
    @IsUUID('4')
    @IsNotEmpty()
    orgid: string

    @ApiProperty({ example: 'Acme Inc.' })
    @IsString()
    @IsNotEmpty()
    orgname: string
}