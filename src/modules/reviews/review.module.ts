import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from 'src/schemas/review.schema';

import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Order, OrderSchema } from 'src/schemas/order.schema';
import { TypeOfReview, TypeOfReviewSchema } from 'src/schemas/typeOfReview.shema';



@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Review.name,
                schema: ReviewSchema,
            },
            {
                name: Order.name,
                schema: OrderSchema,

            },
            {
                name: TypeOfReview.name,
                schema: TypeOfReviewSchema,

            }
        ])
    ],
    providers: [ReviewService],
    controllers: [ReviewController]
            
})

export class ReviewModule { };