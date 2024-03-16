import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/users/user.module';
import { CustomerModule } from './modules/customers/customer.module';
import { MerchantModule } from './modules/merchants/merchant.module';
import { ShipperModule } from './modules/shippers/shipper.module';
import { PaymentMethodModule } from './modules/paymentMethods/paymentMethod.module';
import { AddressModule } from './modules/address/address.module';
import { DocumentModule } from './modules/documents/document.module';
import { OrderModule } from './modules/orders/order.module';
import { TransferModule } from './modules/transfers/transfer.module';
import { UserMerchantModule } from './modules/userMerchant/merchant.module';
import { DocumentTypeModule } from './modules/documentTypes/document.module';
import { FoodModule } from './modules/foods/food.module';
import { DetailOrderModule } from './modules/detailOrders/detailOrder.module';
import { ReviewModule } from './modules/reviews/review.module';
import { ImageReviewModule } from './modules/imageReviews/imageReview.module';
import { AdminModule } from './modules/admins/admin.module';
import { VoucherModule } from './modules/vouchers/voucher.module';

@Module({
  imports: [
    UserModule,
    CustomerModule,
    MerchantModule,
    ShipperModule,
    UserMerchantModule,
    TransferModule,
    PaymentMethodModule,
    AddressModule,
    OrderModule,
    DocumentModule,
    DocumentTypeModule,
    FoodModule,
    DetailOrderModule,
    ReviewModule,
    ImageReviewModule,
    AdminModule,
    VoucherModule,


    MongooseModule.forRoot('mongodb+srv://hoangkun610:Levanhoang000@yumhub.muqzonu.mongodb.net/API_YUMHUB'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
