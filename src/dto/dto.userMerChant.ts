import { IsOptional, IsString } from "class-validator";
import { Merchant } from "src/schemas/merchant.schema";
import { User } from "src/schemas/user.schemas";

export class UserMerchantDto {
    
    @IsOptional()
    merChantID? : Merchant
    
    @IsOptional()
    userID? : User

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
