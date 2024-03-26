// upload.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image  } from 'src/schemas/image.schema';

@Injectable()
export class UploadService {
  constructor(@InjectModel('Image') private readonly imageModel: Model<Image>) {}

  async uploadImage(imageData: any): Promise<Image> {
    const createdImage = new this.imageModel(imageData);
    return createdImage.save();
  }
}
