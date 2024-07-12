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
  async createPayout(
    @Body('stripeAccountId') stripeAccountId: string,
    @Body('amount') amount: number,
    @Body('destination') destination: string,
  ) {
    return await this.stripeService.createPayout(stripeAccountId, amount, destination);
  }
  @Post('connect-stripe-customer')
  async connectStripeCustomer(@Body('email') email: string) {
    return this.stripeService.createConnectedAccount(email);
  }
  @Post('update-stripe-capability')
  async updateCapability(
    @Body('accountId') accountId: string,
    @Body('documentFrontBase64') documentFrontBase64: string,
    @Body('documentBackBase64') documentBackBase64: string,
  ) {
    return this.stripeService.updateCapability(
      accountId,
      documentFrontBase64,
      documentBackBase64,
    );
  }
  @Post('add-bank-account')
  async addBankAccount(
    @Body('stripeAccountId') stripeAccountId: string,
    @Body('account_holder_name') accountHolderName: string,
    @Body('routing_number') routingNumber: string,
    @Body('account_number') accountNumber: string,
  ) {
    return await this.stripeService.addBankAccount(stripeAccountId, accountHolderName, routingNumber, accountNumber);
  }
}