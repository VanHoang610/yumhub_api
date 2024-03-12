import { Controller } from '@nestjs/common'
import { ReviewCustomerService } from './review.service';

@Controller()
export class ReviewCustomerController {

    constructor (private readonly reviewCustomerService: ReviewCustomerService) {}
}