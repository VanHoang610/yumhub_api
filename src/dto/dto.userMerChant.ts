import { IsOptional, IsString } from "class-validator";
import { Merchant } from "src/schemas/merchant.schema";

export class UserMerchantDto {
    
    @IsOptional()
    merChantID? : Merchant

    @IsString()
    @IsOptional() //1: admin, 2: employee
    role?: number

    @IsString()
    @IsOptional()
    fullName?: string

    @IsString()
    @IsOptional()
    sex?: string
}
