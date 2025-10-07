import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
    @IsString({message: 'Title must be a string'})
    @IsNotEmpty({message: 'Title is required'})
    @ApiProperty({ example: 'New Task' })
    @MaxLength(255)
    title: string;
    @IsString({message: 'Description must be a string'})
    @IsOptional()
    @ApiProperty({ example: 'This is a new task', required: false })
    description?: string;
    @IsOptional()
    @ApiProperty({ example: false, required: false })
    isCompleted?: boolean;
    @IsUUID('4', {message: 'OrgId must be a valid UUID'})
    @ApiProperty({ example: 'a3bb189e-8bf9-3888-9912-ace4e6543002' })
    @IsNotEmpty({message: 'OrgId is required'})
    orgId: string;
}