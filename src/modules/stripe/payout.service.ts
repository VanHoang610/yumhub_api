import { Injectable } from '@nestjs/common';
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

  async createPayout(amount: number, bankAccountInfo: any): Promise<any> {
    try {
      const bankAccountToken = await this.stripe.tokens.create({
        bank_account: {
          country: bankAccountInfo.country,
          currency: bankAccountInfo.currency,
          account_holder_name: bankAccountInfo.account_holder_name,
          account_holder_type: bankAccountInfo.account_holder_type,
          routing_number: bankAccountInfo.routing_number,
          account_number: bankAccountInfo.account_number,
        },
      });

      const payout = await this.stripe.payouts.create({
        amount: amount,
        currency: 'usd',
        destination: bankAccountToken.id,
      });

      return payout;
    } catch (error) {
      throw new Error(`Error creating payout: ${error.message}`);
    }
  }
}
