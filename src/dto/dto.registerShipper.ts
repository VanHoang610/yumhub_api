import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class RegisterShipperDto {

    @IsNotEmpty()
    @IsString()
    phoneNumber: string

    @IsNotEmpty()
    @IsString()
    email: string

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
    
    @IsString()
    idBike: string

    @IsOptional()
    @IsString()
    idCardFontSide?: string

    @IsOptional()
    @IsString()
    idCardBackSide?: string

    @IsOptional()
    @IsString()
    driverLicenseFontSide?: string

    @IsOptional()
    @IsString()
    driverLicenseBackSide?: string

    @IsOptional()
    @IsString()
    parrotCarFontSide?: string

    @IsOptional()
    @IsString()
    parrotCarBackSide?: string
}