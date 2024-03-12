import { IsOptional, IsString } from "class-validator";
import { Food } from "src/schemas/food.schema";

export class ReviewFoodDto {

    @IsOptional()
    foodID?: Food

    @IsString()
    rating: string

    @IsOptional()
    @IsString()
    description: string

    @IsString()
    image: string
}