import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/users/user.module';
import { CustomerModule } from './modules/customers/customer.module';
import { MerchantModule } from './modules/merchants/merchant.module';
import { ShipperModule } from './modules/shippers/shipper.module';
import { PaymentMethodModule } from './modules/paymentMethods/paymentMethod.module';
import { ReivewMerchantModule } from './modules/reviewMerchants/reviewMerchant.module';
import { AddressModule } from './modules/address/address.module';
import { ReviewCustomerModule } from './modules/reviewCustomer/review.module';
import { DocumentModule } from './modules/documents/document.module';
import { OrderModule } from './modules/orders/order.module';
import { TransferModule } from './modules/transfers/transfer.module';
import { UserMerchantModule } from './modules/userMerchant/merchant.module';
import { DocumentTypeModule } from './modules/documentTypes/document.module';
import { FoodModule } from './modules/foods/food.module';
import { ReviewFoodModule } from './modules/reviewFoods/reviewFood.module';
import { DetailOrderModule } from './modules/detailOrders/detailOrder.module';
import { ReviewModule } from './modules/reviews/review.module';
import { ImageReviewModule } from './modules/imageReviews/imageReview.module';
import { AdminModule } from './modules/admins/admin.module';
import { uploadModule } from './modules/upload/upload.module';


@Module({
  imports: [
    UserModule,
    CustomerModule,
    MerchantModule,
    ShipperModule,
    UserMerchantModule,
    TransferModule,
    PaymentMethodModule,
    // ReivewMerchantModule,
    AddressModule,
    // ReviewCustomerModule,
    OrderModule,
    DocumentModule,
    DocumentTypeModule,
    FoodModule,
    // ReviewFoodModule,
    DetailOrderModule,
    ReviewModule,
    ImageReviewModule,
    AdminModule,
    uploadModule,

    MongooseModule.forRoot('mongodb://127.0.0.1:27017/yumhub'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
