import { Controller } from '@nestjs/common'
import { PaymentMethodService } from './paymentMethod.service';

@Controller()
export class PaymentMethodController {

    constructor(private readonly paymentMethodService: PaymentMethodService) {}
}