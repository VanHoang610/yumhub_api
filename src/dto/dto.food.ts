import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { FoodStatus } from "src/schemas/foodStatus.schema";
import { Merchant } from "src/schemas/merchant.schema";
import { TypeOfFood } from "src/schemas/typeOfFood.schema";


export class FoodDto {

    @IsOptional()
    merchantID?: Merchant

    @IsOptional()
    type?: TypeOfFood

    @IsOptional()
    foodStatus?: FoodStatus

    @IsString()
    @IsOptional()
    image?: string

    @IsString()
    nameFood: string

    @IsNumber()
    price: number

    @IsNumber()
    @IsOptional()
    priceForSale?: number

   
}