import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './modules/customers/customer.module';
import { MerchantModule } from './modules/merchants/merchant.module';
import { ShipperModule } from './modules/shippers/shipper.module';
import { PaymentMethodModule } from './modules/paymentMethods/paymentMethod.module';
import { AddressModule } from './modules/address/address.module';
import { DocumentModule } from './modules/documents/document.module';
import { OrderModule } from './modules/orders/order.module';
import { UserMerchantModule } from './modules/userMerchant/merchant.module';
import { DocumentTypeModule } from './modules/documentTypes/document.module';
import { FoodModule } from './modules/foods/food.module';
import { DetailOrderModule } from './modules/detailOrders/detailOrder.module';
import { ReviewModule } from './modules/reviews/review.module';
import { ImageReviewModule } from './modules/imageReviews/imageReview.module';
import { AdminModule } from './modules/admins/admin.module';
import { uploadModule } from './modules/upload/upload.module';
import { VoucherModule } from './modules/vouchers/voucher.module';
import { HistoryWalletMerchantModule } from './modules/historyWalletMerchant/walletMerchant.module';
import { HistoryWalletShipperModule } from './modules/historyWalletShipper/history.module';
import { OrderStatusModule } from './modules/orderStatus/orderStatus.module';
import { TransactionTypeMerchantModule } from './modules/transactionTypeMerchant/typeMerchant.module';
import { TransactionTypeShipperModule } from './modules/transactionTypeShipper/transactionTypeShipper.module';
import { TypeOfMerchantModule } from './modules/typeOfMerchant/typeOfMerchant.module';
import { TypeOfReviewModule } from './modules/typeOfReview/typeOfReview.module';
import { TypeOfVoucherModule } from './modules/typeOfVoucher/typeOfVoucher.module';
import { foodStatusModule } from './modules/foodStatus/foodStatus.module';
import { TypeOfFoodModule } from './modules/typeOfFood/typeOfFood.module';
import { AdsModule } from './modules/ads/ads.module';

@Module({
  imports: [
    CustomerModule,
    MerchantModule,
    ShipperModule,
    UserMerchantModule,
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
    uploadModule,
    VoucherModule,

    //new
    HistoryWalletMerchantModule,
    HistoryWalletShipperModule,
    OrderStatusModule,
    TransactionTypeMerchantModule,
    TransactionTypeShipperModule,
    TypeOfMerchantModule,
    TypeOfReviewModule,
    TypeOfVoucherModule,
    TypeOfFoodModule,
    foodStatusModule,
    AdsModule,
    MongooseModule.forRoot('mongodb+srv://hoangkun610:Levanhoang000@yumhub.muqzonu.mongodb.net/API_YUMHUB'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
