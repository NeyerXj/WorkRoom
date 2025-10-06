import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class CreateOrg{

    @ApiProperty({ example: 'Acme Inc.' })
    @IsString()
    @IsNotEmpty()
    orgname: string

    @ApiProperty({ type: [String], required: false, description: 'UUID начальных участников' })
    @IsArray()
    @IsOptional()
    memberships: string[];

    // @IsUUID()
    // owner_email:string
}