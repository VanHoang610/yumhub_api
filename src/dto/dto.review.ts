import { IsNotEmpty, IsOptional, IsString, IsNumber } from "class-validator";
import { Order } from "src/schemas/order.schema";
import { User } from "src/schemas/user.schemas";

export class ReviewDto {

    @IsNotEmpty()
    reviewerID?: User

    @IsNotEmpty()
    orderID?: Order

    @IsString()
    @IsOptional()
    description?: string

    @IsNumber()
    @IsNotEmpty()
    rating: number

    @IsNotEmpty()
    typeOfReview: number

}