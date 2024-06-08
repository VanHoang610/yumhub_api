import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Merchant } from "src/schemas/merchant.schema";
import { TypeOfMerchant } from "src/schemas/typeOfMerchant.schema";

export class RegisterMerchatDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    address: string

    @IsOptional()
    @IsString()
    type: TypeOfMerchant

    @IsOptional()
    @IsString()
    openTime: string

    @IsOptional()
    @IsString()
    closeTime: string

    @IsOptional()
    @IsString()
    imageBackground: string

    @IsNotEmpty()
    @IsString()
    phoneNumber: string

    @IsOptional()
    @IsString()
    fullName: string

    @IsOptional()
    @IsString()
    sex: string

    @IsOptional()
    @IsString()
    avatar: string

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    imageDocuments: string[];

}