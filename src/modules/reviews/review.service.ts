import { Injectable } from '@nestjs/common'
import { HttpException, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { create } from 'domain';
import { Model, ObjectId } from 'mongoose';
import { ReviewDto } from 'src/dto/dto.review';
import { Order } from 'src/schemas/order.schema';
import { Review } from 'src/schemas/review.schema';
import { TypeOfReview } from 'src/schemas/typeOfReview.shema';




@Injectable()
export class ReviewService {

    constructor(@InjectModel(Review.name) private reviewModel: Model<Review>,
        @InjectModel(Order.name) private orderModel: Model<Order>,
        @InjectModel(TypeOfReview.name) private reviewType: Model<TypeOfReview>,) { }


    async createReivew(createReview: ReviewDto) {
        try {
            const order = createReview.orderID;
            const orderID = await this.orderModel.findById(order);
            if (!orderID) throw new HttpException("Not Found OrderID", HttpStatus.NOT_FOUND)

            const typeOfReview = createReview.typeOfReview;
            const typeOfReviewID = await this.reviewType.findById(typeOfReview);

            const review = new this.orderModel({
                orderID: orderID._id,
                typeOfReviewID: typeOfReviewID._id,
                ...createReview
            });
            const saveReview = await review.save();
            return { result: true, review: saveReview }
        } catch (error) {
            return { result: false, review: error }
        }
    }


    async getAllReview() {
        try {
            const reviews = await this.reviewModel.find();
            return { result: true, reviews: reviews }
        } catch (error) {
            return { result: true, reviews: error }
        }
    }



    async updateReview(id: string, createReivew: ReviewDto) {
        try {
            const updateReview = await this.reviewModel.findByIdAndUpdate(id, createReivew, { new: true });
            if (!updateReview) throw new HttpException("Not Found ReviewID", HttpStatus.NOT_FOUND);

            return { result: true, updateReview: updateReview }
        } catch (error) {
            return { result: false, updateReview: error }
        }
    }



    // tìm id user bị review
    async findUserId(reviewID: string) {
        const review = (await this.reviewModel.findById(reviewID));
        const order = (await this.reviewModel.findById(reviewID)).orderID;
        var user: Object;

        const reviewType = await this.reviewType.findById(review.typeOfReview).exec();
        var nameType = reviewType.name
        if (nameType == "shipperToCustomer") { // người bị review là customer
            user = (await this.orderModel.findById(order)).customerID;
        } else if (nameType == "customerToMerchant") { // 2 là merchant
            user = (await this.orderModel.findById(order)).merchantID;
        } else if (nameType == "customerToShipper") { // 3 là shipper
            user = (await this.orderModel.findById(order)).shipperID;  
        }
        return user;
    }

    //tìm id user review 
    async findUserIdReview(reviewID: string) {
        const review = (await this.reviewModel.findById(reviewID));
        const order = (await this.reviewModel.findById(reviewID)).orderID;
        var user: Object;
        const reviewType = await this.reviewType.findById(review.typeOfReview).exec();
        var nameType = reviewType.name
        if (nameType == "shipperToCustomer") { // người review là shipper
            user = (await this.orderModel.findById(order)).shipperID;
        } else if (nameType == "customerToMerchant") { // 2 là customer
            user = (await this.orderModel.findById(order)).customerID;
        } else if (nameType == "customerToShipper"){ // 3 là customertoshipper thì cũng là customer
            user = (await this.orderModel.findById(order)).customerID;
        }
        return user;
    }
    async calculateAverageRating(userId: string) {
        try {
            let totalRating = 0;
            let totalReviews = 0;

            // Tìm tất cả các đánh giá liên quan đến người dùng từ bảng Review
            const reviews = await this.reviewModel.find().exec();

            // Duyệt qua từng đánh giá
            for (const review of reviews) {
                const user = (await this.findUserId(review._id.toString())).toString();
                if (user === userId) {
                    totalRating += review.rating; // Tổng điểm đánh giá
                    console.log(totalRating);
                    totalReviews++; // Tổng số lượng đánh giá
                    console.log(totalReviews);
                } else {
                    continue;
                }
            }

            // Tính điểm trung bình
            const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;
            return { result: true, averageRating: averageRating }
        } catch (error) {
            return { result: false, averageRating: error }
        }

    }
    // lấy ra lịch sử tất cả các đánh giá mình đánh giá
    async getAllHistoryReview(UserId: string) {
        try {
            const reviews = await this.reviewModel.find().exec(); // Lấy tất cả các review

            const history = []; // Khởi tạo mảng lưu trữ các đánh giá

            for (const review of reviews) {
                const userIdFromReview = (await this.findUserIdReview(review._id.toString())).toString(); // Lấy userId từ reviewId
                if (userIdFromReview === UserId) { // So sánh userId từ review với UserId
                    history.push(review); // Nếu trùng khớp, thêm review vào mảng history
                }
            }
            return { result: true, history: history }; // Trả về mảng lịch sử đánh giá


        } catch (error) { return { result: false, history: error } }

    }
    // lấy ra tất cả lịch sử những đánh giá mình
    async getAllHistoryBeReview(UserId: string) {
        try {
            const reviews = await this.reviewModel.find().exec(); // Lấy tất cả các review

            const history = []; // Khởi tạo mảng lưu trữ các đánh giá

            for (const review of reviews) {
                const userIdFromReview = (await this.findUserId(review._id.toString())).toString(); // Lấy userId từ reviewId
                
                if (userIdFromReview === UserId) { // So sánh userId từ review với UserId
                    history.push(review); // Nếu trùng khớp, thêm review vào mảng history
                }
            }
            return { result: true, history: history }; // Trả về mảng lịch sử đánh giá
        } catch (error) {
            return { result: false, history: error }
        }

    }

}

