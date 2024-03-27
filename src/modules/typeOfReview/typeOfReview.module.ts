import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOfReview, TypeOfReviewSchema } from "src/schemas/typeOfReview.shema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: TypeOfReview.name,
                schema: TypeOfReviewSchema
            }
        ])
    ]
})
export class TypeOfReviewModule { };