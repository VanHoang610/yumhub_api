import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';
import { Bucket } from '@google-cloud/storage';

@Injectable()
export class UploadService {
  // private bucket: admin.storage.Bucket;
  private readonly storage: admin.storage.Storage;

  constructor() {
    const serviceAccount = require('../auth/serviceAccountKey.json');

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: 'yumhub-api-c3646.appspot.com', // Thay bằng tên bucket của bạn
    });

    this.storage = admin.storage();
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new Error('No file uploaded');
    }
    const bucket = this.storage.bucket();

    const uniqueFileName = this.generateUniqueFileName(file.originalname);
    const fileUpload = bucket.file(uniqueFileName);

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
          resolve(`https://storage.googleapis.com/${bucket.name}/${uniqueFileName}`);
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
