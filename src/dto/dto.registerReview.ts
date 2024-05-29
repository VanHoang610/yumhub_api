import { IsArray, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Order } from "src/schemas/order.schema";

export class RegisterReviewDto {
    @IsNotEmpty()
    orderID: Order;

    @IsOptional()
    description?: string

    @IsOptional()
    @IsNumber()
    rating: number

    @IsEmpty()
    typeOfReviewID: number

    @IsOptional()
    @IsArray() 
    @IsString({ each: true }) // phần tử trong mảng là một chuổi 
    images: string[];
}