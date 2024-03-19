import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class MerchantDto {

    @IsNotEmpty({message:"tên không được để trống"})
    @IsString()
    name: string
    
    @IsNotEmpty({message:"tên không được để trống"})
    @IsString()
    address: string

    @IsOptional()
    @IsString()
    type?: string


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
    @IsString()
    businessLicense?: string

}
