import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from 'src/schemas/review.schema';

import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Order, OrderSchema } from 'src/schemas/order.schema';


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

            }
        ])
    ],
    providers: [ReviewService],
    controllers: [ReviewController]
})

export class ReviewModule { };