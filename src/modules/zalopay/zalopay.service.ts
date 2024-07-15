import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class ZalopayService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async createOrder(): Promise<string> {
    const app_id = this.configService.get('ZALOPAY_APP_ID');
    const app_trans_id = `${new Date().getFullYear()}${Date.now()}`;
    const app_user = 'demo';
    const amount = 10000; // Số tiền
    const app_time = Date.now();
    const embed_data = '{}';
    const items = '[]';
    const description = `Thanh toán cho đơn hàng #${app_trans_id}`;
    const key1 = this.configService.get('ZALOPAY_KEY1');
    const mac = crypto.createHmac('sha256', key1)
      .update(`${app_id}|${app_trans_id}|${app_user}|${amount}|${app_time}|${embed_data}|${items}`)
      .digest('hex');

    const response = await this.httpService.post('https://sandbox.zalopay.com.vn/v001/tpe/createorder', {
      app_id,
      app_trans_id,
      app_user,
      amount,
      app_time,
      embed_data,
      items,
      description,
      mac,
    }).toPromise();

    return response.data.order_url;
  }
}
