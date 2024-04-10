import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { Merchant, MerchantSchema } from 'src/schemas/merchant.schema';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';
import { Order, OrderSchema } from 'src/schemas/order.schema';
import { Shipper, ShipperSchema } from 'src/schemas/shipper.schema';
import { UserMerchant, UserMerchantSchema } from 'src/schemas/userMerchant.schema';
import { ResetPassword, ResetPasswordSchema } from 'src/schemas/resetPass.schema';

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
           {
            name: Shipper.name,
            schema: ShipperSchema,
           },
           {
            name: UserMerchant.name,
            schema: UserMerchantSchema,
           },
           {
            name: ResetPassword.name,
            schema: ResetPasswordSchema,
           },
        ]),
    ],
    controllers: [MerchantController],
    providers: [MerchantService],
})
export class MerchantModule { };
