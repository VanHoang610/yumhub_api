
import { IsNumber, IsOptional, IsString, IsNotEmpty } from "class-validator";
import { Order } from "src/schemas/order.schema";

export class ReviewDto {
  
    @IsNotEmpty()
    orderID: Order

    @IsString()
    @IsOptional()
    description?: string

    @IsNumber()
    @IsNotEmpty()
    rating: number

    @IsNotEmpty()
    typeOfReview: number

}