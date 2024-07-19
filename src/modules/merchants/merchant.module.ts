import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { Merchant, MerchantSchema } from 'src/schemas/merchant.schema';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';
import { Order, OrderSchema } from 'src/schemas/order.schema';
import { Shipper, ShipperSchema } from 'src/schemas/shipper.schema';
import { UserMerchant, UserMerchantSchema } from 'src/schemas/userMerchant.schema';
import { ResetPassword, ResetPasswordSchema } from 'src/schemas/resetPass.schema';
import { OrderStatus, OrderStatusSchemas } from 'src/schemas/orderStatus.schema';
import { HistoryWalletMerchant, HistoryWalletMerchantSchemas } from 'src/schemas/historyWalletMerchant.schema';
import { TransactionTypeMerchant, TransactionTypeMerchantSchema } from 'src/schemas/transactionTypeMerchant.schema';
import { Food, FoodSchema } from 'src/schemas/food.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { Review, ReviewSchema } from 'src/schemas/review.schema';
import { PaymentMethodMerchant, PaymentMethodMerchantSchema } from 'src/schemas/paymentMethodMerchant.schema';
import { DocumentMerchant, DocumentMerchantSchema } from 'src/schemas/documentMerchant.schema';
import { TypeOfMerchant, TypeOfMerchantSchema } from 'src/schemas/typeOfMerchant.schema';
import { Customer, CustomerSchema } from 'src/schemas/customer.schemas';
import { Address, AddressSchema } from 'src/schemas/address.schema';

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
           {
            name: OrderStatus.name,
            schema: OrderStatusSchemas,
           },
           {
            name: HistoryWalletMerchant.name,
            schema: HistoryWalletMerchantSchemas,
           },
           {
            name: TransactionTypeMerchant.name,
            schema: TransactionTypeMerchantSchema,
           },
           {
            name: Food.name,
            schema: FoodSchema,
           },
           {
            name: Review.name,
            schema: ReviewSchema,
           },
           {
            name: Food.name,
            schema: FoodSchema,
           },
           {
            name: DocumentMerchant.name,
            schema: DocumentMerchantSchema,
           },
           {
            name: PaymentMethodMerchant.name,
            schema: PaymentMethodMerchantSchema,
           },
           {
            name: TypeOfMerchant.name,
            schema: TypeOfMerchantSchema,
           },
           {
            name: Customer.name,
            schema: CustomerSchema,
           },
           {
            name: Address.name,
            schema: AddressSchema,
           },
           {
            name: HistoryWalletMerchant.name,
            schema: HistoryWalletMerchantSchemas,
           },
        ]),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '30d' },
        })
    ],
    controllers: [MerchantController],
    providers: [MerchantService],
})
export class MerchantModule { };
