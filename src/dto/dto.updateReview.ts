import { IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateReviewDto {

    @IsString()
    @IsOptional()
    description?: string

}