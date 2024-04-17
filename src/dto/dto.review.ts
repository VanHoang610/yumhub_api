
import { IsNumber, IsOptional, IsString, IsNotEmpty } from "class-validator";
import { Order } from "src/schemas/order.schema";
import { TypeOfReview } from "src/schemas/typeOfReview.shema";

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
    typeOfReview: TypeOfReview

    @IsOptional()
    @IsString()
    createAt?: string

}