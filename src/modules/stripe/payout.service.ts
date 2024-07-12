import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { promises as fs } from 'fs';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private readonly logger = new Logger(StripeService.name);
  
  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2024-06-20',
    });
  }

  async uploadFile(filePath: string): Promise<string> {
    try {
      const fileStream = await fs.readFile(filePath);
      const file = await this.stripe.files.create({
        purpose: 'identity_document',
        file: {
          data: fileStream,
          name: 'document.jpg', // Tên tệp của bạn
          type: 'application/octet-stream',
        },
      });

      this.logger.log(`File uploaded: ${file.id}`);
      return file.id;
    } catch (error) {
      this.logger.error('Error uploading file:', error);
      throw error;
    }
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
      type: 'custom',
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
  async updateCapability(
    accountId: string,
    documentFrontId: string,
    documentBackId: string,
  ): Promise<Stripe.Account> {
    const account = await this.stripe.accounts.update(accountId, {
      business_profile: {
        mcc: '5734',
        url: 'https://duantotnghiep-api-a32664265dc1.herokuapp.com', // URL của trang web của bạn
      },
      business_type: 'individual', // Hoặc 'company' nếu bạn đang cập nhật thông tin doanh nghiệp
      tos_acceptance: {
        date: Math.floor(Date.now() / 1000), // Thời gian chấp nhận TOS (UNIX timestamp)
        ip: '192.168.0.1', // Địa chỉ IP của người chấp nhận TOS
      },
      individual: {
        id_number: '123456789',
          verification: {
            document: {
              front: documentFrontId,
              back: documentBackId, // Nếu tài liệu xác minh yêu cầu mặt trước và mặt sau
            },
          },
        address: {
          city: 'San Francisco',
          line1: '123 Market St',
          postal_code: '94105',
          state: 'CA',
        },
        dob: {
          day: 1,
          month: 1,
          year: 1990,
        },
        email: 'thuthuongxinhgai@gmail.com',
        first_name: 'Thuthuong',
        last_name: 'Nguyen',
        phone: '+14155552671',
        ssn_last_4: '1234',
      },
      external_account: {
        object: 'bank_account',
        country: 'US',
        currency: 'usd',
        account_holder_name: 'Thuthuong Nguyen',
        account_holder_type: 'individual',
        routing_number: '110000000',
        account_number: '000123456789',
      },
    });
    const updateCapability = await this.stripe.accounts.updateCapability(
      accountId,
      'transfers',
      {
        requested: true,
      }
    )
    updateCapability
    return account;
  }
  
  
  async createPayout(amount: number, currency: string, destination: string) {
    return this.stripe.payouts.create({
      amount,
      currency,
      destination,
    });
  }


}