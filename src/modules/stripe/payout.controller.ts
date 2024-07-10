import { Controller, Post, Body } from '@nestjs/common';
import { PayoutService } from './payout.service';

@Controller('payout')
export class PayoutController {
  constructor(private readonly payoutService: PayoutService) {}

  @Post()
  async createPayout(@Body() payoutDto: any): Promise<any> {
    const { amount, bankAccountInfo } = payoutDto;
    return this.payoutService.createPayout(amount, bankAccountInfo);
  }
}
