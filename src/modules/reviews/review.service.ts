import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from 'src/schemas/review.schema';

@Injectable()
export class ReviewService { 

    constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}
}