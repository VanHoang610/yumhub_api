import { IsNotEmpty, IsOptional, IsString } from "class-validator";
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

}