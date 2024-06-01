import { IsEmpty, IsNotEmpty, IsOptional, IsString, IsNumber } from "class-validator";
import { TypeOfMerchant } from "src/schemas/typeOfMerchant.schema";

export class MerchantDto {

    @IsNotEmpty({message:"tên không được để trống"})
    @IsString()
    name: string
    
    @IsNotEmpty({message:"tên không được để trống"})
    @IsString()
    address: string

    @IsOptional()
    @IsString()
    joinDay?: string

    @IsOptional()
    @IsNumber()
    type?: TypeOfMerchant

    @IsOptional()
    @IsString()
    closeTime?: string

    @IsOptional()
    @IsString()
    openTime?: string

    @IsOptional()
    @IsNumber()
    rating?: number

    @IsOptional()
    @IsNumber()
    status?: number

    @IsOptional()
    @IsString()
    businessLicense?: string

    @IsNumber()
    longitude: number

    @IsNumber()
    latitude: number

    @IsString()
    phoneNumber: string

    @IsString()
    email: string

    @IsString()
    fullName: string
}
