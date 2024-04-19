import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from 'src/schemas/review.schema';

import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Order, OrderSchema } from 'src/schemas/order.schema';

import { TypeOfReview, TypeOfReviewSchema } from 'src/schemas/typeOfReview.shema';
import { ImageReview, ImageReviewSchema } from 'src/schemas/imageReview.schema';
import { Customer, CustomerSchema } from 'src/schemas/customer.schemas';
import { Shipper, ShipperSchema } from 'src/schemas/shipper.schema';
import { Merchant, MerchantSchema } from 'src/schemas/merchant.schema';




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
            },
            {
                name: ImageReview.name,
                schema: ImageReviewSchema,
            },
            {
                name: Customer.name,
                schema: CustomerSchema,
            },
            {
                name: Shipper.name,
                schema: ShipperSchema,
            },
            {
                name: Merchant.name,
                schema: MerchantSchema,
            }
        ])
    ],
    providers: [ReviewService],
    controllers: [ReviewController]
})

export class ReviewModule { };