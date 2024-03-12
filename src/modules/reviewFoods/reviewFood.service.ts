import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReviewFood } from 'src/schemas/reviewFood.schema';

@Injectable()
export class ReviewFoodService {

    constructor (@InjectModel(ReviewFood.name) private reviewFoodModel: Model<ReviewFood>) { }
}