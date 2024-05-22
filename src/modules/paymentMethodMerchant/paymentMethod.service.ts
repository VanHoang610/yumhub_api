import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentMethodMerchant } from 'src/schemas/paymentMethodMerchant.schema';

@Injectable()
export class PaymentMethodMerchantService {

    constructor(@InjectModel(PaymentMethodMerchant.name) private paymentMethods: Model<PaymentMethodMerchant>) {}

    async addData() {
        try {
            const paymentMerchant = await this.paymentMethods.create([{
                merchantID: "660c99c2fc13ae788b50fbdc",
                numberCard: 5143151,
                nameInCard: "Selig",
                exprirationDate: "8/16/2027",
                cvv: 605
              }, {
                merchantID: "660c99c2fc13ae788b50fbdd",
                numberCard: 6254636,
                nameInCard: "Oliviero",
                exprirationDate: "10/21/2026",
                cvv: 377
              }, {
                merchantID: "660c99c2fc13ae788b50fbde",
                numberCard: 1872345,
                nameInCard: "Brockie",
                exprirationDate: "8/3/2028",
                cvv: 392
              }, {
                merchantID: "660c99c2fc13ae788b50fbdf",
                numberCard: 1284453,
                nameInCard: "Colver",
                exprirationDate: "10/15/2027",
                cvv: 345
              }, {
                merchantID: "6623ba85e9633b12179cdeaa",
                numberCard: 8241190,
                nameInCard: "Torrence",
                exprirationDate: "9/30/2027",
                cvv: 388
              }])
            return { result: true, paymentMerchant: paymentMerchant }
        } catch (error) {
            return { result: false, order: error }
        }
    }

    async getPaymentMerchant(id: string) {
        try {
            const paymentMethodMerchant = await this.paymentMethods.findOne({ merchantID: id });
            if (!paymentMethodMerchant) {
                throw new HttpException('Not Found PaymentMethodMerchant', HttpStatus.NOT_FOUND);
            }
            await this.paymentMethods.populate(paymentMethodMerchant, { path: 'merchantID' });

            return { result: true, paymentMethod: paymentMethodMerchant };
        } catch (error) {
            return {result: false, paymentMethod: error}
        }
    }

}