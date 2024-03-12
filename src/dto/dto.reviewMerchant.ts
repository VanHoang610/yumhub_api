import { IsOptional, IsString } from "class-validator";
import { Merchant } from "src/schemas/merchant.schema";

export class ReviewMerchantDto {

    @IsOptional()
    merchantID?: Merchant

    @IsOptional()
    @IsString()
    rating: string

    @IsOptional()
    @IsString()
    description?: string

    @IsOptional()
    @IsString()
    image?: string
    
}
