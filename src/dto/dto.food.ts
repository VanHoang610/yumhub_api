import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { FoodStatus } from "src/schemas/foodStatus.schema";
import { GroupOfFood } from "src/schemas/groupOfFood.schema";
import { Merchant } from "src/schemas/merchant.schema";



export class FoodDto {

    @IsOptional()
    merchantID?: Merchant

    @IsOptional()
    group?: GroupOfFood

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