import { Module  } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ReviewFood, ReviewFoodSchema } from "src/schemas/reviewFood.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: ReviewFood.name,
                schema: ReviewFoodSchema
            }
        ])
    ]
})

export class ReviewFoodModule { };