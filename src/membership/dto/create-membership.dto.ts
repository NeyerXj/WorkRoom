import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { OrgRole } from "../entities/membership.entity";

export class MembershipCreateDto{
    @IsEnum(OrgRole)
    role: OrgRole

    @IsUUID('4')
    @IsNotEmpty()
    orgid: string

    @IsString()
    @IsNotEmpty()
    orgname: string
}