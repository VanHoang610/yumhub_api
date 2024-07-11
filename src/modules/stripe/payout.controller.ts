import { Controller, Post, Body } from '@nestjs/common';
import { PayoutService } from './payout.service';


export class CreatePayoutDto {
    amount: number;
    bankAccountInfo: {
      country: string;
      currency: string;
      account_id: string;
      account_holder_name?: string;
      account_holder_type?: string;
      routing_number?: string;
      account_number?: string;
    };
  }
  
  @Controller('payout')
  export class PayoutController {
    constructor(private readonly payoutService: PayoutService) {}
  
    @Post()
    async createPayout(@Body() createPayoutDto: CreatePayoutDto): Promise<any> {
      const { amount, bankAccountInfo } = createPayoutDto;
      return this.payoutService.createPayout(amount, bankAccountInfo);
    }
    @Post('checkout')
    async createCheckout(): Promise<any> {
      return this.payoutService.createCheckout();
    }
  }