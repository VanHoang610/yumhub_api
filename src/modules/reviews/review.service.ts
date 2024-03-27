import { Injectable } from '@nestjs/common'
import { HttpException,  HttpStatus} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { create } from 'domain';
import { Model } from 'mongoose';
import { ReviewDto } from 'src/dto/dto.review';
import { Order } from 'src/schemas/order.schema';
import { Review } from 'src/schemas/review.schema';
import { TypeOfReview } from 'src/schemas/typeOfReview.shema';




@Injectable()
export class ReviewService { 

    constructor(@InjectModel(Review.name) private reviewModel: Model<Review>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(TypeOfReview.name) private reviewType: Model<TypeOfReview>,) {}

    // async createReivew(createReview: ReviewDto) {
    //     try {
    //         const order = createReview.orderID;
    //         const orderID = await this.orderModel.findById(order);
    //         if(!orderID) throw new HttpException("Not Found OrderID", HttpStatus.NOT_FOUND)

    //         const reviewer = createReview.reviewerID;
    //         const reviewerID = await this.userModel.findById(reviewer);
    //         if(!reviewerID) throw new HttpException("Not Found UserID", HttpStatus.NOT_FOUND)

    //         const review = new this.reviewModel({
    //             ...createReview,
    //             orderID: orderID._id,
    //             reviewerID: reviewerID._id,
    //         });
            
    //         const saveReview = await review.save();
    //         return {result: true, review: saveReview}
    //     } catch (error) {
    //         return {result: false, review: error}
    //     }
    // }

    // async getAllReview() {
    //     try {
    //         const reviews =  await this.reviewModel.find().populate('orderID').populate('reviewerID')
    //         return {result: true, reviews: reviews}
    //     } catch (error) {
    //         return {result: true, reviews: error}
    //     }
    // }

    // async updateReview(id: string, createReivew: ReviewDto) {
    //     try {
    //         const updateReview = await this.reviewModel.findByIdAndUpdate(id, createReivew, {new: true});
    //         if(!updateReview) throw new HttpException("Not Found ReviewID", HttpStatus.NOT_FOUND);

    //         return { result: true, UpdateReview: updateReview }
    //     } catch (error) {
    //         return { result: false, UpdateReview: error }
    //     }
    // }

 
   
    async findUserId(reviewID: string) {
        const review = (await this.reviewModel.findById(reviewID));
        const order = (await this.reviewModel.findById(reviewID)).orderID;
       
        
        // if (!review) {
        //     throw new Error('Review not found');
        // }
        
        var user : Object;
        
        
        if (review.typeOfReview.name=== "shipperToCustomer") { // người bị review là customer
            user = (await this.orderModel.findById(order)).customerID;
        } else if (review.typeOfReview.name === "cutomerToMerchant") { // 2 là merchant
            user = (await this.orderModel.findById(order)).merchantID;
        } else { // 3 là shipper
            user = (await this.orderModel.findById(order)).shipperID;
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

