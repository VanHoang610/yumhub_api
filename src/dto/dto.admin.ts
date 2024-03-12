import { IsEmpty, IsOptional, IsString } from "class-validator";

export class AdminDto {

    @IsString()
    @IsEmpty()
    userName: string

    @IsString()
    @IsEmpty()
    password: string

    @IsOptional()
    @IsString()
    fullName?: string

    
    @IsOptional()
    @IsString()
    avatar?: string

    
    @IsOptional()
    @IsString()
    sex?: string
}