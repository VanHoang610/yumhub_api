import { IsNumber, IsOptional, IsString } from "class-validator";
import { Order } from "src/schemas/order.schema";
import { User } from "src/schemas/user.schemas";

export class ReviewDto {

    @IsOptional()
    reviewerID?: User

    @IsOptional()
    orderID?: Order

    @IsString()
    @IsOptional()
    description?: string

    @IsString()
    rating: number

    @IsNumber()
    @IsOptional()
    typeOfReview?: number

}