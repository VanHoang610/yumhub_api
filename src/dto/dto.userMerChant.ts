import { IsOptional, IsString } from "class-validator";
import { Merchant } from "src/schemas/merchant.schema";
import { User } from "src/schemas/user.schemas";

export class UserMerchantDto {
    
    @IsOptional()
    merChantID? : Merchant
    
    @IsOptional()
    userID? : User

    @IsString()
    @IsOptional()
    role?: string

    @IsString()
    @IsOptional()
    fullName?: string

    @IsString()
    @IsOptional()
    sex?: string
}
