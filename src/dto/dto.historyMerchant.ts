import { IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Merchant } from "src/schemas/merchant.schema";

export class HistoryMerchantDto {

    @IsNotEmpty()
    amountTransantion: number

    @IsOptional()
    @IsString()
    description: string
    
}