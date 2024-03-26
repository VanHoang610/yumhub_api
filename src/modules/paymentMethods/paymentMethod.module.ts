import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { PaymentMethod, PaymentMethodSchema } from 'src/schemas/paymentMethodShipper.schema';
import { PaymentMethodController } from './paymentMethod.controller';
import { PaymentMethodService } from './paymentMethod.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: PaymentMethod.name,
                schema: PaymentMethodSchema,
            }
        ])
    ],
    controllers: [PaymentMethodController],
    providers: [PaymentMethodService]
})

export class PaymentMethodModule { };