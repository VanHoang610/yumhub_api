import { Controller } from '@nestjs/common'
import { MerchantService } from './merchant.service';

@Controller('merchants')
export class MerchantController {

    constructor (private readonly merchantService: MerchantService) {}
}