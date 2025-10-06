import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";


export class CreateOrg{

    @IsString()
    @IsNotEmpty()
    orgname: string

    @IsArray()
    @IsOptional()
    memberships: string[];

    // @IsUUID()
    // owner_email:string
}