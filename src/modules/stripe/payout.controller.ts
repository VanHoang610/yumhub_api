import { Controller, Post, Body } from '@nestjs/common';
import { PayoutService } from './payout.service';

@Controller('payout')
export class PayoutController {
  constructor(private readonly payoutService: PayoutService) {}

  @Post('create-external-account')
  async createExternalAccount(@Body() bankDetails: any) {
    return this.payoutService.createExternalAccount('user_id', bankDetails);
  }

  @Post('create-payout')
  async createPayout(@Body() body: { accountId: string; amount: number }) {
    return this.payoutService.createPayout(body.accountId, body.amount);
  }
  
  @Post('create-payment-intent')
  async createPaymentIntent(@Body('amount') amount: number) {
    const paymentIntent = await this.payoutService.createPaymentIntent(amount);
    return {
      clientSecret: paymentIntent.client_secret,
    };
  }
}