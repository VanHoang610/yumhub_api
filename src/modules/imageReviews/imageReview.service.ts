import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImageReview } from 'src/schemas/imageReview.schema';

@Injectable()
export class ImageReviewService {

    constructor(@InjectModel(ImageReview.name) private imageReviewModel: Model<ImageReview> ) {}
}