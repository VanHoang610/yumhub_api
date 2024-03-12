import { Controller } from '@nestjs/common'
import { UserMerchant } from 'src/schemas/userMerchant.schema';
import { UserMerchantService } from './merchant.service';

@Controller()
export class UserMerchantController {

    constructor(private readonly userMerchantServices: UserMerchantService) { }
}