import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from 'src/schemas/review.schema';
import { Order } from 'src/schemas/order.schema';

@Injectable()
export class ReviewService { 

    constructor(@InjectModel(Review.name) private reviewModel: Model<Review>,
    @InjectModel(Order.name) private orders: Model<Order>) { }
   
    async findUserId(reviewID: string) {
        const review = (await this.reviewModel.findById(reviewID));
        const order = (await this.reviewModel.findById(reviewID)).orderID;
       
        
        // if (!review) {
        //     throw new Error('Review not found');
        // }
        
        var user : Object;
        
        
        if (review.typeOfReview === 1) { // 1 là customer
            user = (await this.orders.findById(order)).customerID;
        } else if (review.typeOfReview === 2) { // 2 là merchant
            user = (await this.orders.findById(order)).merchantID;
        } else { // 3 là shipper
            user = (await this.orders.findById(order)).shipperID;
        }
    
        return user;
    }
    async calculateAverageRating(userId: string): Promise<number> {
        let totalRating = 0;
        let totalReviews = 0;
    
        // Tìm tất cả các đánh giá liên quan đến người dùng từ bảng Review
        const reviews = await  this.reviewModel.find().exec();
    
        // Duyệt qua từng đánh giá
        for (const review of reviews) {
            const user = (await this.findUserId(review._id.toString())).toString();
            if (user === userId) {
                totalRating += review.rating; // Tổng điểm đánh giá
                console.log(totalRating);
                totalReviews++; // Tổng số lượng đánh giá
                console.log(totalReviews);
            }else{
                continue;
            }
        }
    
        // Tính điểm trung bình
        const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;
    
        return averageRating;
    }
    
}
