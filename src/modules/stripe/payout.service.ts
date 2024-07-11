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

  // payment done
  async createPaymentIntent(amount: number, currency: string = 'usd'): Promise<Stripe.PaymentIntent> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100, // Số tiền phải được tính bằng cents
      currency,
      payment_method_types: ['card'],
    });
    return paymentIntent;
  }
  // payment done
  // payout
  async createCustomer(email: string) {
    return this.stripe.customers.create({ email });
  }
  async createTransfer(amount: number, currency: string, destination: string) {
    return this.stripe.transfers.create({
      amount,
      currency,
      destination,
    });
  }

  async createExternalAccount(customerId: string, bankAccount: any) {
    return this.stripe.customers.createSource(customerId, { source: bankAccount });
  }
  async createConnectedAccount(email: string) {
    const account = await this.stripe.accounts.create({
      type: 'express',
      country: 'US',
      email: email,
      capabilities: {
        transfers: { requested: true },
        // crypto_transfers: { requested: true },
        // legacy_payments: { requested: true },
      },
    });
    const updateCapability = await this.stripe.accounts.updateCapability(
      account.id,
      'card_payments',
      {
        requested: true,
      }
    )
    updateCapability
    return account;
  }
  async updateCapability(id: string) {
    const updateCapability = await this.stripe.accounts.updateCapability(
      id,
      'transfers',
      {
        requested: true,
      }
    )
    return updateCapability;
  }
  
  
  async createPayout(amount: number, currency: string, destination: string) {
    return this.stripe.payouts.create({
      amount,
      currency,
      destination,
    });
  }
}