import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentMethodMerchant, PaymentMethodMerchantSchema } from 'src/schemas/paymentMethodMerchant.schema';
import { PaymentMethodMerchantController } from './paymentMethod.controller';
import { PaymentMethodMerchantService } from './paymentMethod.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: PaymentMethodMerchant.name,
                schema: PaymentMethodMerchantSchema,
            }
        ])
    ],
    controllers: [PaymentMethodMerchantController],
    providers: [PaymentMethodMerchantService]
})

export class PaymentMethodModule { };