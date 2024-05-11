
import { Controller, Post, Body, Get, Param, Patch, NotFoundException, UseGuards, Delete, Query } from '@nestjs/common'
import { ReviewService } from './review.service';
import { ReviewDto } from 'src/dto/dto.review';
import { RegisterReviewDto } from 'src/dto/dto.registerReview';
import { AuthGuard } from 'src/helper/auth.middleware';
@Controller('reviews')
export class ReviewController {


    constructor(private readonly reviewService: ReviewService) { }
    // Tạo data
    @Get('addData')
    addData() {
        try {
            const review = this.reviewService.addData();
            return review;
        } catch (error) {
            console.error(error)
        }
    }
    // Tạo review
    @Post('createReview')
    @UseGuards(AuthGuard)
    createReview(@Body() createReview: RegisterReviewDto) {
        try {
            const review = this.reviewService.createReivew(createReview);
            return review;
        } catch (error) {
            console.error(error)
        }
    }


    // lấy tất cả
    @Get('getAllReview')
    @UseGuards(AuthGuard)
    getAllReview() {
        try {
            const review = this.reviewService.getAllReview();
            return review;
        } catch (error) {
            console.error(error)
        }
    }
    
    @Delete('delete')
    @UseGuards(AuthGuard)
    deleteReview(@Query('id') id: string) {
        try {
            this.reviewService.DeleteReview(id);
            return "đã xoá thành công";
        } catch (error) {
            return error
        }
    }

    // sửa review
    @Patch('updateReview')
    @UseGuards(AuthGuard)
    updateReview(@Query('id') id: string, @Body() updateReview: ReviewDto) {
        try {
            const review = this.reviewService.updateReview(id, updateReview);
            return review;
        } catch (error) {
            console.error("Update review fail", error)
        }
    }

    
  
   
}