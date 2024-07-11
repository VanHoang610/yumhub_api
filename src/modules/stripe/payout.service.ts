import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PayoutService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2024-06-20',
    });
  }

  async createExternalAccount(userId: string, bankDetails: any) {
    try {
      const account = await this.stripe.accounts.create({
        type: 'custom',
        country: 'US',
        email: 'user@example.com',
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      });

      const externalAccount = await this.stripe.accounts.createExternalAccount(account.id, {
        external_account: {
          object: 'bank_account',
          country: 'US',
          currency: 'usd',
          account_holder_name: bankDetails.account_holder_name,
          account_holder_type: 'individual',
          routing_number: bankDetails.routing_number,
          account_number: bankDetails.account_number,
        },
      });

      return externalAccount;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createPayout(accountId: string, amount: number) {
    try {
      const payout = await this.stripe.payouts.create({
        amount,
        currency: 'usd',
        destination: accountId,
        method: 'instant',
      });

      return payout;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createPaymentIntent(amount: number, currency: string = 'usd'): Promise<Stripe.PaymentIntent> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100, // Số tiền phải được tính bằng cents
      currency,
      payment_method_types: ['card'],
    });
    return paymentIntent;
  }
}
