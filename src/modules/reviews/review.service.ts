import { Injectable } from '@nestjs/common'
import { HttpException, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { create } from 'domain';
import { RegisterCustomerDto } from 'src/dto/dto.registerCustomer';
import { RegisterReviewDto } from 'src/dto/dto.registerReview';
import { Model, ObjectId } from 'mongoose';
import { ReviewDto } from 'src/dto/dto.review';
import { Order } from 'src/schemas/order.schema';
import { Review } from 'src/schemas/review.schema';
import { TypeOfReview } from 'src/schemas/typeOfReview.shema';
import { ImageReview } from 'src/schemas/imageReview.schema';
import { Customer } from 'src/schemas/customer.schemas';
import { Merchant } from 'src/schemas/merchant.schema';
import { Shipper } from 'src/schemas/shipper.schema';
import { UpdateReviewDto } from 'src/dto/dto.updateReview';




@Injectable()
export class ReviewService {

    constructor(@InjectModel(Review.name) private reviewModel: Model<Review>,
        @InjectModel(Order.name) private orderModel: Model<Order>,
        @InjectModel(TypeOfReview.name) private reviewType: Model<TypeOfReview>,
        @InjectModel(ImageReview.name) private imageReivewModel: Model<ImageReview>,
        @InjectModel(Customer.name) private customers: Model<Customer>,
        @InjectModel(Shipper.name) private shippers: Model<Shipper>,
        @InjectModel(Merchant.name) private merchants: Model<Merchant>,
    ) { }


    async createReview(createReview: ReviewDto) {
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



    async addData() {
        try {
            const reviews = await this.reviewModel.create({
                _id: "660c9e6cfc13ae76f950fb0f",
                orderID: "660c9dc319f26b917ea15835",
                description: "Lilllie",
                rating: 4,
                typeOfReview: "6604e5a181084710d45efe9e",
            }, {
                _id: "660c9e6cfc13ae76f950fb10",
                orderID: "660c9dc319f26b917ea15834",
                description: "Lilllie",
                rating: 4,
                typeOfReview: "6604e5a181084710d45efe9e",
            }, {
                _id: "660c9e6cfc13ae76f950fb11",
                orderID: "660c9dc319f26b917ea15834",
                description: "Lilllie",
                rating: 4,
                typeOfReview: "6604e5a181084710d45efe9d",
            }, {
                _id: "660c9e6cfc13ae76f950fb12",
                orderID: "6604de8e26f9a8b37aeb30cf",
                description: "Lilllie",
                rating: 4,
                typeOfReview: "6604e5a181084710d45efe9c",
            }, {
                _id: "660c9e6cfc13ae76f950fb13",orderID: "660c9dc319f26b917ea15833",
                description: "Lilllie",
                rating: 4,
                typeOfReview: "6604e5a181084710d45efe9e",
            }, 
            )

            return { result: true, reviews: reviews }
        } catch (error) {
            return { result: true, reviews: error }
        }
    }

    async createReivew(createReview: RegisterReviewDto) {
        try {
            const { orderID, description, rating, typeOfReviewID } = createReview;
            const customerToMerchant = '6604e5a181084710d45efe9c';
            const customerToShipper = '6604e5a181084710d45efe9d';
            const shipperToCustomer = '6604e5a181084710d45efe9e';

            if (typeOfReviewID == 1) {
                const reviewNew = new this.reviewModel({
                    orderID: orderID,
                    description: description,
                    rating: rating,
                    typeOfReview: customerToMerchant
                })
                await reviewNew.save();
                return { result: true, newReview: reviewNew }
            } else if (typeOfReviewID == 2) {
                const reviewNew = new this.reviewModel({
                    orderID: orderID,
                    description: description,
                    rating: rating,
                    typeOfReview: customerToShipper
                })
                await reviewNew.save();
                return { result: true, newReview: reviewNew }
            } else {
                const reviewNew = new this.reviewModel({
                    orderID: orderID,
                    description: description,
                    rating: rating,
                    typeOfReview: shipperToCustomer
                })
                await reviewNew.save();
                return { result: true, newReview: reviewNew }
            }
        } catch (error) {
            return { result: false, review: error }
        }
    }

    async getAllReview() {
        try {
            const reviews = await this.reviewModel.find().populate('typeOfReview');
            return { result: true, reviews: reviews }
        } catch (error) {
            return { result: true, reviews: error }
        }
    }

    async updateReview(id: string, updateReivew: UpdateReviewDto) {
        try {
            const updateReview = await this.reviewModel.findByIdAndUpdate(id, updateReivew, { new: true });
            if (!updateReview) throw new HttpException("Not Found ReviewID", HttpStatus.NOT_FOUND);
            return { result: true, updateReview: updateReview }
        } catch (error) {
            return { result: false, updateReview: error }
        }
    }

    async getAllFeedback(merchantID: string) {
        try {
            const reviews = await this.reviewModel.find({typeOfReview: '6604e5a181084710d45efe9e', 'orderID.merchantID': merchantID});if (!reviews) throw new HttpException("Not Found ReviewID", HttpStatus.NOT_FOUND);
            return reviews
        } catch (error) {
            return { result: false, updateReview: error }
        }
    }
   
    async DeleteReview(id: string){
        
        return this.reviewModel.findByIdAndDelete(id)
    }

}