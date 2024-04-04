import { IsEmpty, IsNumber, IsOptional } from "class-validator";
import { Order } from "src/schemas/order.schema";
import { TypeOfReview } from "src/schemas/typeOfReview.shema";

export class RegisterReviewDto {
    @IsEmpty()
    orderID: Order;

    @IsOptional()
    description?: string

    @IsEmpty()
    @IsNumber()
    rating: number

    @IsEmpty()
    typeOfReviewID: number
}