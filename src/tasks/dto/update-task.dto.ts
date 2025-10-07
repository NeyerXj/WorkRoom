import { IsBoolean, IsOptional, IsString, MaxLength } from "class-validator"

export class UpdateTaskDto {
    @IsString()
    @MaxLength(255)
    @IsOptional()
    title?: string
    @IsString()
    @IsOptional()
    description?: string
    @IsBoolean()
    @IsOptional()
    isCompleted?: boolean
}