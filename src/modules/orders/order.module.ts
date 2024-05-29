import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/schemas/order.schema';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Customer, CustomerSchema } from 'src/schemas/customer.schemas';
import { Merchant, MerchantSchema } from 'src/schemas/merchant.schema';
import { Shipper, ShipperSchema } from 'src/schemas/shipper.schema';
import { Voucher, VoucherSchema } from 'src/schemas/voucher.schema';
import { OrderStatus, OrderStatusSchemas } from 'src/schemas/orderStatus.schema';
import { DetailOrder, DetailOrderSchema } from 'src/schemas/detailOrder.schema';
import { Review, ReviewSchema } from 'src/schemas/review.schema';
import { ImageReview, ImageReviewSchema } from 'src/schemas/imageReview.schema';
import { Fee, FeeSchema } from 'src/schemas/fee.schema';

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name: Order.name,
                schema: OrderSchema
            },
            {
                name: Customer.name,
                schema: CustomerSchema
            },
            {
                name: Merchant.name,
                schema: MerchantSchema
            },
            {
                name: Shipper.name,
                schema: ShipperSchema
            },
            {
                name: Voucher.name,
                schema: VoucherSchema
            },
            {
                name: OrderStatus.name,
                schema: OrderStatusSchemas
            },
            {
                name: Review.name,
                schema: ReviewSchema
            },
            {
                name: ImageReview.name,
                schema: ImageReviewSchema
            },
            {
                name: Fee.name,
                schema: FeeSchema
            },
        ])
    ],
    providers: [OrderService],
    controllers: [OrderController]
})

export class OrderModule { };