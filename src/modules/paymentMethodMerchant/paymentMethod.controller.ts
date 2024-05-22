import { Controller, Get, Query } from '@nestjs/common'
import { PaymentMethodMerchantService } from './paymentMethod.service';

@Controller('paymentMethodMerchant')
export class PaymentMethodMerchantController {

    constructor(private readonly paymentMethodService: PaymentMethodMerchantService) {}

     // addData
     @Get('addData')
     async addData() {
         return await this.paymentMethodService.addData();
     }

     //getPaymentMethodMerchant
     @Get('getPaymentMerchant')
     async getPaymentMerchant(@Query('id') id: string) {
        try {
            return await this.paymentMethodService.getPaymentMerchant(id);
        } catch (error) {
            return error
        }
     }
}