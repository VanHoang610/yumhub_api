import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PaymentMethodService {

    // constructor(@InjectModel(PaymentMethod.name) private paymentMethods: Model<PaymentMethod>) {}
}