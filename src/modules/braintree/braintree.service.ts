import { Injectable } from '@nestjs/common';
import * as braintree from 'braintree';

@Injectable()
export class BraintreeService {
  private gateway: braintree.BraintreeGateway;

  constructor() {
    this.gateway = new braintree.BraintreeGateway({
      environment: braintree.Environment.Sandbox,
      merchantId: 'yp4k3yww4mjxy3mk',
      publicKey: '5kcf6f794qx8nw8w',
      privateKey: 'sandbox_cs9945ws_yp4k3yww4mjxy3mk',
    });
  }

  async generateClientToken(): Promise<string> {
    const response = await this.gateway.clientToken.generate({});
    return response.clientToken;
  }
}
