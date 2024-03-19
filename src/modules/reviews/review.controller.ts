import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common' 
import { ReviewService } from './review.service';
import { ReviewDto } from 'src/dto/dto.review';

@Controller('reviews')
export class ReviewController {

    constructor(private readonly reviewService: ReviewService) {}

    //Tạo review
    @Post('createReview')
    createReview(@Body() createReview: ReviewDto) {
        try {
            const review = this.reviewService.createReivew(createReview);
            return review;
        } catch (error) {
            console.error(error)
        }
    }


    // lấy tất cả
    @Get('getAllReview') // chưa
    getAllReview() {
        try {
            const review = this.reviewService.getAllReview();
            return review;
        } catch (error) {
            console.error(error)
        }
    }

    // sửa review
    @Patch('updateReview/:id')
    updateReview(@Param('id') id: string, @Body() updateReview: ReviewDto) {
        try {
            const review = this.reviewService.updateReview(id, updateReview);
            return review;
        } catch (error) {
            console.error("Update review fail", error)
        }
    }

}