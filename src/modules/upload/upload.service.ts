import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from 'src/schemas/image.schema';
import * as fs from 'fs';
import { promisify } from 'util';
import * as path from 'path'; // Import path module

@Injectable()
export class UploadService {
  constructor(@InjectModel('Image') private readonly imageModel: Model<Image>) {}

  async uploadFile(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new Error('No file uploaded');
    }

    // Generate unique file name with original file extension
    const uniqueFileName = this.generateUniqueFileName(file.originalname);

    // Construct full file path
    const filePath = path.join(__dirname, '..', 'uploads', uniqueFileName);

    // Move uploaded file to the designated directory
    await promisify(fs.rename)(file.path, filePath);

    // Return the URL of the uploaded file
    return '/uploads/' + uniqueFileName;
  }

  // Function to generate a unique file name by appending a timestamp
  generateUniqueFileName(originalName: string): string {
    const timestamp = new Date().getTime();
    const extension = path.extname(originalName); // Get file extension
    return timestamp + extension; // Append timestamp to original file extension
  }
}

