import { IsEmpty, IsNotEmpty, IsOptional, IsString, IsNumber } from "class-validator";


export class MerchantDto {

    @IsNotEmpty({message:"tên không được để trống"})
    @IsString()
    name: string
    
    @IsNotEmpty({message:"tên không được để trống"})
    @IsString()
    address: string

    @IsOptional()
    @IsNumber()
    type?: number

    @IsOptional()
    @IsString()
    closeTime?: string

    @IsOptional()
    @IsString()
    openTime?: string

    @IsOptional()
    @IsString()
    rating?: string

    @IsOptional()
    @IsString()
    businessLicense?: string

    @IsNumber()
    longitude: number

    @IsNumber()
    latitude: number

}
