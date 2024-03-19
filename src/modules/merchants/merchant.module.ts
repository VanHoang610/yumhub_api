import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { Merchant, MerchantSchema } from 'src/schemas/merchant.schema';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';
import { Order, OrderSchema } from 'src/schemas/order.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
           {
            name: Merchant.name,
            schema: MerchantSchema,
           },
           {
            name: Order.name,
            schema: OrderSchema,
           },
        ]),
    ],
    controllers: [MerchantController],
    providers: [MerchantService],
})
export class MerchantModule { };
