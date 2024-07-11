import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2024-06-20',
    });
  }

  async createCustomer(email: string) {
    return this.stripe.customers.create({ email });
  }

  async createPaymentIntent(amount: number, currency: string, customerId: string) {
    return this.stripe.paymentIntents.create({
      amount,
      currency,
      customer: customerId,
    });
  }

  async createTransfer(amount: number, currency: string, destination: string) {
    return this.stripe.transfers.create({
      amount,
      currency,
      destination,
    });
  }

  async createPayout(amount: number, currency: string, destination: string) {
    return this.stripe.payouts.create({
      amount,
      currency,
      destination,
    });
  }
}
