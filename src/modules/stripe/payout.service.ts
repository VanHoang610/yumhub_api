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
      // Handle different countries
      if (bankAccountInfo.country === 'VN') {
        // Information about Vietnamese banks using SWIFT code
        const bankTransfer = await this.stripe.transfers.create({
          amount,
          currency: bankAccountInfo.currency,
          destination: bankAccountInfo.account_id, // Assuming account_id is the ID of the Stripe account or bank account
        });
        return bankTransfer;
      } else {
        // Handle other countries
        const bankTransfer = await this.stripe.transfers.create({
          amount,
          currency: bankAccountInfo.currency,
          destination: bankAccountInfo.account_id, // Assuming account_id is the ID of the Stripe account or bank account
        });
        return bankTransfer;
      }
    } catch (error) {
      // Handle error
      throw error;
    }
  }
}
