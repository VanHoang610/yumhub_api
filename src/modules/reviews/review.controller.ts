import { Controller, Param, Get, NotFoundException } from '@nestjs/common'
import { ReviewService } from './review.service';
import { get } from 'mongoose';

@Controller("reviews")
export class ReviewController {

    constructor(private readonly reviewService: ReviewService) { }
    @Get('average-rating/:userId')
    async getAverageRating(@Param('userId') userId: string): Promise<number> {
        // Gọi phương thức calculateAverageRating từ ReviewService và trả về kết quả
        const averageRating = await this.reviewService.calculateAverageRating(userId);
        return averageRating;
    }
    @Get("getRatting/:id")
    async getReview(@Param('id') id: string) {
        return await this.reviewService.findUserId(id);
    }


}