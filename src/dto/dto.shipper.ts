import { IsOptional, IsString } from "class-validator";

export class ShipperDto {

    @IsOptional()
    @IsString()
    phoneNumber: string

    @IsOptional()
    @IsString()
    email: string

    @IsOptional()
    @IsString()
    password: string

    @IsOptional()
    @IsString()
    joinDay?: string

    @IsOptional()
    @IsString()
    avatar?: string
    
    @IsString()
    @IsOptional()
    fullName?: string

    @IsOptional()
    @IsString()
    sex?: string

    @IsOptional()
    @IsString()
    birthDay?: string

    @IsOptional()
    @IsString()
    address?: string

    @IsOptional()
    @IsString()
    brandBike?: string

    @IsOptional()
    @IsString()
    modeCode?: string
    
    @IsOptional()
    @IsString()
    idBike: string

    @IsOptional()
    status: number

}
