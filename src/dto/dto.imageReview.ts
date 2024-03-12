import { IsOptional, IsString } from "class-validator";
import { Review } from "src/schemas/review.schema";

export class ImageReviewDto {

    @IsOptional()
    reviewID?: Review

    @IsString()
    image: string
}