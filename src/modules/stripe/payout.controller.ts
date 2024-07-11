import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './payout.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-customer')
  async createCustomer(@Body('email') email: string) {
    return this.stripeService.createCustomer(email);
  }

  @Post('create-payment-intent')
  async createPaymentIntent(@Body('amount') amount: number) {
    const paymentIntent = await this.stripeService.createPaymentIntent(amount);
    return {
      clientSecret: paymentIntent.client_secret,
    };
  }

  @Post('create-transfer')
  async createTransfer(@Body() createTransferDto: { amount: number; currency: string; destination: string }) {
    const { amount, currency, destination } = createTransferDto;
    return this.stripeService.createTransfer(amount, currency, destination);
  }

  @Post('create-external-account')
  async createExternalAccount(@Body() createExternalAccountDto: { customerId: string; bankAccount: any }) {
    const { customerId, bankAccount } = createExternalAccountDto;
    return this.stripeService.createExternalAccount(customerId, bankAccount);
  }

  @Post('create-payout')
  async createPayout(@Body() createPayoutDto: { amount: number; currency: string; destination: string }) {
    const { amount, currency, destination } = createPayoutDto;
    return this.stripeService.createPayout(amount, currency, destination);
  }
}