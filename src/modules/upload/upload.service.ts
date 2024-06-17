import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class UploadService {
  private bucket: admin.storage.Bucket;

  constructor() {
    const serviceAccount = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../auth/serviceAccountKey.json'), 'utf8'));

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,  // Thay bằng tên bucket của bạn
    });

    this.bucket = admin.storage().bucket();
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new Error('No file uploaded');
    }

    const uniqueFileName = this.generateUniqueFileName(file.originalname);
    const fileUpload = this.bucket.file(uniqueFileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (error) => {
        reject(error);
      });

      stream.on('finish', () => {
        fileUpload.makePublic().then(() => {
          resolve(`https://storage.googleapis.com/${this.bucket.name}/${uniqueFileName}`);
        });
      });

      stream.end(file.buffer);
    });
  }

  private generateUniqueFileName(originalName: string): string {
    const timestamp = new Date().getTime();
    const extension = path.extname(originalName);
    return `${timestamp}${extension}`;
  }
}
