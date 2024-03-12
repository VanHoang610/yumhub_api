import { IsNumber, IsOptional, IsString } from "class-validator";
import { Merchant } from "src/schemas/merchant.schema";


export class FoodDto {

    @IsOptional()
    merchantID?: Merchant

    @IsString()
    @IsOptional()
    image?: string

    @IsString()
    nameFood: string

    @IsNumber()
    price: number

    @IsString()
    @IsOptional()
    type?: string
}