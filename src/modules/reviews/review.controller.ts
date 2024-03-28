
import { Controller, Post, Body, Get, Param, Patch, NotFoundException } from '@nestjs/common' 
import { ReviewService } from './review.service';
import { ReviewDto } from 'src/dto/dto.review';
import { get } from 'mongoose';
@Controller('reviews')
export class ReviewController {

    constructor(private readonly reviewService: ReviewService) {}

    //Tạo review
    // @Post('createReview')
    // createReview(@Body() createReview: ReviewDto) {
    //     try {
    //         const review = this.reviewService.createReivew(createReview);
    //         return review;
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }


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
  
    // tính trung bình
    @Get('average-rating/:id')
    async getAverageRating(@Param('id') id: string): Promise<number> {
        // Gọi phương thức calculateAverageRating từ ReviewService và trả về kết quả
        const averageRating = await this.reviewService.calculateAverageRating(id);
        return averageRating;
    }
  
    // nhập vào id review dể lấy id người bị review
    @Get("getUser/:id")
    async getReview(@Param('id') id: string) {
        return await this.reviewService.findUserId(id);
    }





}