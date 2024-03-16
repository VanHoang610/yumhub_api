import { Injectable } from '@nestjs/common'
import { HttpException,  HttpStatus} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { create } from 'domain';
import { Model } from 'mongoose';
import { ReviewDto } from 'src/dto/dto.review';
import { Order } from 'src/schemas/order.schema';
import { Review } from 'src/schemas/review.schema';
import { User } from 'src/schemas/user.schemas';

@Injectable()
export class ReviewService { 

    constructor(@InjectModel(Review.name) private reviewModel: Model<Review>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(User.name) private userModel: Model<User>) {}

    async createReivew(createReview: ReviewDto) {
        try {
            const order = createReview.orderID;
            const orderID = await this.orderModel.findById(order);
            if(!orderID) throw new HttpException("Not Found OrderID", HttpStatus.NOT_FOUND)

            const reviewer = createReview.reviewerID;
            const reviewerID = await this.userModel.findById(reviewer);
            if(!reviewerID) throw new HttpException("Not Found UserID", HttpStatus.NOT_FOUND)

            const review = new this.reviewModel({
                ...createReview,
                orderID: orderID._id,
                reviewerID: reviewerID._id,
            });
            
            const saveReview = await review.save();
            return {result: true, review: saveReview}
        } catch (error) {
            return {result: false, review: error}
        }
    }

    async getAllReview() {
        try {
            const reviews =  await this.reviewModel.find().populate('orderID').populate('reviewerID')
            return {result: true, reviews: reviews}
        } catch (error) {
            return {result: true, reviews: error}
        }
    }

    async updateReview(id: string, createReivew: ReviewDto) {
        try {
            const updateReview = await this.reviewModel.findByIdAndUpdate(id, createReivew, {new: true});
            if(!updateReview) throw new HttpException("Not Found ReviewID", HttpStatus.NOT_FOUND);

            return { result: true, UpdateReview: updateReview }
        } catch (error) {
            return { result: false, UpdateReview: error }
        }
    }
}