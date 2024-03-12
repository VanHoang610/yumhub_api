import { Controller } from '@nestjs/common'
import { ReviewMerchantService } from './reviewMerchant.services';

@Controller()
export class ReviewMerchantController {
    
    constructor(private readonly reviewMerchantService: ReviewMerchantService) {}
}