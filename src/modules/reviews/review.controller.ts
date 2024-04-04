
import { Controller, Post, Body, Get, Param, Patch, NotFoundException } from '@nestjs/common'
import { ReviewService } from './review.service';
import { ReviewDto } from 'src/dto/dto.review';
import { RegisterReviewDto } from 'src/dto/dto.registerReview';
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


    // lấy tất cả danh sách review đánh giá đến cửa hàng
    @Get('getAllFeedback/:id')
    async getAllFeedBack(@Param("id") idMerchant: string) {
        try {
            const getAllFeedBack = await this.reviewService.getAllFeedback(idMerchant);
            return getAllFeedBack
        } catch (error) {
            return error
        }
    }

    // // tính trung bình
    // @Get('average-rating/:userId')
    // async getAverageRating(@Param('userId') userId: string): Promise<number> {
    //     // Gọi phương thức calculateAverageRating từ ReviewService và trả về kết quả
    //     const averageRating = await this.reviewService.calculateAverageRating(userId);
    //     return averageRating;
    // }

    // // lấy trung bình dựa theo id
    // @Get("getRatting/:id")
    // async getReview(@Param('id') id: string) {
    //     return await this.reviewService.findUserId(id);
    // }





}