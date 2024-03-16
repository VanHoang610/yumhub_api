import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from 'src/schemas/review.schema';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Order, OrderSchema } from 'src/schemas/order.schema';
import { User, UserSchema } from 'src/schemas/user.schemas';

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
                name: User.name,
                schema: UserSchema,
            }
        ])
    ],
    providers: [ReviewService],
    controllers: [ReviewController]
})

export class ReviewModule { };