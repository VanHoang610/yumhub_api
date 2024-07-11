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
      privateKey: '803f84dacf11a76c3b44a0b706c54132',
    });
  }

  async generateClientToken(): Promise<string> {
    const response = await this.gateway.clientToken.generate({});
    return response.clientToken;
  }
}
