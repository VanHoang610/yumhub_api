import { Module } from '@nestjs/common';
import { BraintreeService } from './braintree.service';
import { BraintreeController } from './braintree.controller';

@Module({
  providers: [BraintreeService],
  controllers: [BraintreeController],
})
export class BraintreeModule {}
