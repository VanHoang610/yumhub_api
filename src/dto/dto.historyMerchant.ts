import { IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Merchant } from "src/schemas/merchant.schema";

export class HistoryMerchantDto {

    @IsNotEmpty()
    amountTransantion: number

    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    status: number

    @IsOptional()
    @IsString()
    nameBank: string

    @IsOptional()
    @IsString()
    numberBank: string

    @IsOptional()
    @IsString()
    accountHolder: string
    
}