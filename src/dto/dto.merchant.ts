import { IsEmpty, IsOptional, IsString } from "class-validator";


export class MerchantDto {

    @IsEmpty()
    @IsString()
    name: string
    
    @IsEmpty()
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
    @IsString()
    rating?: string

    @IsOptional()
    @IsString()
    businessLicense?: string

}
