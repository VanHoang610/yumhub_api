import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Merchant } from "src/schemas/merchant.schema";
import { TypeOfMerchant } from "src/schemas/typeOfMerchant.schema";

export class RegisterEmployeeDto {
    @IsNotEmpty()
    @IsString()
    merchantID: Merchant

    @IsString()
    @IsNotEmpty()
    phoneNumber: string

    @IsString()
    @IsNotEmpty()
    password: string
    
    @IsString()
    @IsNotEmpty()
    email: string

    @IsOptional()
    @IsString()
    fullName: string

    @IsOptional()
    @IsString()
    sex: string

    @IsOptional()
    @IsString()
    avatar: string

}