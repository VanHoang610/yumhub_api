import { Controller, Get } from '@nestjs/common';
import { BraintreeService } from './braintree.service';

@Controller('braintree')
export class BraintreeController {
  constructor(private readonly braintreeService: BraintreeService) {}

  @Get('client_token')
  async getClientToken(): Promise<string> {
    return this.braintreeService.generateClientToken();
  }
}
