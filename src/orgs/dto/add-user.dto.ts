import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsOptional, IsUUID } from "class-validator";
import { OrgRole } from "src/membership/entities/membership.entity";

export class AddUserToOrgDto {
  @IsUUID('4')
  orgId: string;
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  usersId: string[];
  @IsEnum(OrgRole, { message: 'Role must be owner, manager or member' })
  @IsOptional()
  role?: OrgRole;
}