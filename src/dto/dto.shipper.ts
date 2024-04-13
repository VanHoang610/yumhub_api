import { IsBoolean, IsEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ShipperDto {

    @IsEmpty()
    @IsString()
    phoneNumber: string

    @IsEmpty()
    @IsString()
    email: string

    @IsEmpty()
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
    rating?: string

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
    
    @IsString()
    idBike: string

    @IsOptional()
    @IsBoolean()
    active?: boolean

    @IsNumber()
    longitude: number

    @IsNumber()
    latitude: number
}
