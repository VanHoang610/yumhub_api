import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Mongoose } from "mongoose";
import { ReviewCustomer, ReviewCustomerSchema } from "src/schemas/reviewCustomer.schema";


@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: ReviewCustomer.name,
                schema: ReviewCustomerSchema
            }
        ])
    ]
})

export class ReviewCustomerModule { };