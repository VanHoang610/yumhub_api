import { Controller } from '@nestjs/common'
import { ReviewFoodService } from './reviewFood.service';

@Controller()
export class ReviewFoodController { 
    constructor(private readonly reviewFoodService: ReviewFoodService) { }
}