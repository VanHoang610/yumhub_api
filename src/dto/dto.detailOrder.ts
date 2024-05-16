
import { IsEmpty, IsInt, IsNumber, IsOptional, IsString } from "class-validator"
import { Food } from "src/schemas/food.schema"
import { Order } from "src/schemas/order.schema"
export class DetailOrderDto {

    @IsOptional()
    orderID: Order

    @IsOptional()
    foodID: Food

    @IsEmpty()
    @IsNumber()
    @IsInt()
    quantity: number

    @IsOptional()
    @IsString()
    description?: string 
}