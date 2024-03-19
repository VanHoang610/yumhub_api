import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from 'src/schemas/review.schema';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
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
    controllers: [ReviewController],
    providers: [ReviewService],

})

export class ReviewModule { };