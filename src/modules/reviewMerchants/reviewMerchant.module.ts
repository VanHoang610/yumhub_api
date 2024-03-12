import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import mongoose, { Mongoose } from "mongoose";
import { ReviewMerchant, ReviewMerchantSchema } from "src/schemas/reviewMerchant.schema";


@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: ReviewMerchant.name,
                schema: ReviewMerchantSchema,
            }
        ])
    ]
})

export class ReivewMerchantModule { };