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
      // Kiểm tra xem khách hàng đã tồn tại chưa
      const customers = await this.stripe.customers.list({
        email: bankAccountInfo.email,
      });

      let customer: Stripe.Customer;
      if (customers.data.length === 0) {
        // Nếu khách hàng chưa tồn tại, tạo mới khách hàng
        customer = await this.stripe.customers.create({
          email: bankAccountInfo.email,
          name: bankAccountInfo.account_holder_name,
        });
      } else {
        // Nếu khách hàng đã tồn tại, lấy thông tin khách hàng
        customer = customers.data[0];
      }

      // Tạo phương thức thanh toán cho khách hàng
      const paymentMethod = await this.stripe.paymentMethods.create({
        type: 'card',
        card: {
          number: '4242424242424242',
          exp_month: 8,
          exp_year: 2026,
          cvc: '314',
        },
      });

      // Gắn phương thức thanh toán với khách hàng
      await this.stripe.paymentMethods.attach(paymentMethod.id, {
        customer: customer.id,
      });

      // Đặt phương thức thanh toán mặc định cho khách hàng
      await this.stripe.customers.update(customer.id, {
        invoice_settings: {
          default_payment_method: paymentMethod.id,
        },
      });

      // Tạo thanh toán cho khách hàng
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: 500,
        currency: 'gbp',
        payment_method: 'pm_card_visa',
      });

      return paymentIntent;
    } catch (error) {
      throw error;
    }
  }
  async createCheckout(): Promise<any> {

    try {
      const session = await this.stripe.checkout.sessions.create({
        success_url: 'https://example.com/success',
        line_items: [
          {
            price: 'price_1MotwRLkdIwHu7ixYcPLm5uZ',
            quantity: 2,
          },
        ],
        mode: 'payment',
      });
      return session
    } catch (error) {
      throw error;
    }
  }
}
