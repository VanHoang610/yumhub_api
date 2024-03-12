import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ImageReview, ImageReviewSchema } from "src/schemas/imageReview.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: ImageReview.name,
                schema: ImageReviewSchema,
            }
        ])
    ]
})

export class ImageReviewModule { };