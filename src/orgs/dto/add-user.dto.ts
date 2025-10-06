import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsOptional, IsUUID } from "class-validator";
import { OrgRole } from "src/membership/entities/membership.entity";
import { ApiProperty } from '@nestjs/swagger';

export class AddUserToOrgDto {
  @ApiProperty({ format: 'uuid', example: '6a4f6c0a-3a9c-4f06-9a5c-7f7a9bfe2b44' })
  @IsUUID('4')
  orgId: string;
  @ApiProperty({ type: [String], description: 'UUID пользователей', example: ['b1e5...', 'a2c3...'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  usersId: string[];
  @ApiProperty({ enum: OrgRole, required: false, description: 'owner | manager | member' })
  @IsEnum(OrgRole, { message: 'Role must be owner, manager or member' })
  @IsOptional()
  role?: OrgRole;
}