import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from 'src/schemas/review.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Review.name,
                schema: ReviewSchema,
            }
        ])
    ]
})

export class ReviewModule { };