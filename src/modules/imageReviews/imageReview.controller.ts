import { Controller } from '@nestjs/common'
import { ImageReviewService } from './imageReview.service';

@Controller()
export class ImageReviewController {

    constructor(private readonly imageReviewService: ImageReviewService) { }
}