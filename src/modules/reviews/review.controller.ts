
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
            console.error(error)
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

    // tính trung bình
    @Get('averagerating/:id')
    @UseGuards(AuthGuard)
    async getAverageRating(@Param('id') id: string) {
        // Gọi phương thức calculateAverageRating từ ReviewService và trả về kết quả
        const averageRating = await this.reviewService.calculateAverageRating(id);
        return averageRating;
    }
  
    // nhập vào id review dể lấy id người bị review
    @Get("getUser/:id")
    @UseGuards(AuthGuard)
    async getReview(@Param('id') id: string) {
        return await this.reviewService.findUserId(id);
    }
    
}