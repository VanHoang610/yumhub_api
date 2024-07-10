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
      const bankAccount = await this.createBankAccount(bankAccountInfo);

      const bankTransfer = await this.stripe.transfers.create({
        amount,
        currency: bankAccountInfo.currency,
        destination: bankAccount.id, // Sử dụng ID của tài khoản ngân hàng
      });
      return bankTransfer;
    } catch (error) {
      throw error;
    }
  }

  async createBankAccount(bankAccountInfo: any) {
    const accountId = await this.getStripeAccountId(); // Lấy ID tài khoản Stripe của bạn

    const bankAccount = await this.stripe.accounts.createExternalAccount(
      accountId,
      {
        external_account: {
          object: 'bank_account',
          country: bankAccountInfo.country,
          currency: bankAccountInfo.currency,
          account_holder_name: bankAccountInfo.account_holder_name,
          account_holder_type: bankAccountInfo.account_holder_type,
          routing_number: bankAccountInfo.routing_number,
          account_number: bankAccountInfo.account_number,
        },
      }
    );
    return bankAccount;
  }

  async getStripeAccountId(): Promise<string> {
    // Tạo một tài khoản Stripe
    const account = await this.stripe.accounts.create({
      type: 'custom',
      country: 'VN',
      email: 'your-email@example.com', // Thay bằng email của bạn
    });

    return account.id;
  }
}
