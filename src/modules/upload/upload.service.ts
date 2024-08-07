import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class UploadService {
  // private bucket: admin.storage.Bucket;
  private readonly storage: admin.storage.Storage;
  private readonly messaging: admin.messaging.Messaging;

  constructor() {
    const serviceAccount = {
      "type": "service_account",
      "project_id": "yumhub-api-c3646",
      "private_key_id": "d66c58535681cb710ffec8f0f210a1be8262ca95",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDRj2t6G2U/nirS\nRwWFBMcpFTvs+UlydEuV/Nq55+dbuL4UwuGYrdENBgdOMaK3ul8v0hSw61hrsWbS\nDCbBs5NEwYEQFnKgYtFHjiIun6tgjwM2zL5tRY218InU5We4XwKUaOhpSrZ9qbZr\nSAxRAPhFtPJyLKf2CMRAKEmKqebiuRiTuX7cauUVkwFqZDPBZHgBbd+s6KNuUQQj\nyusEWcbaXYCs4cqntHENDgse6jo0RA0jzQkxSRPmni37P39Zq3yUnxZY8Jg5PHtZ\nHPa4TD6mMrSd7ZPLToxzN1Olli38pkkhhqLsjkKU+10rSAgtnD3ojM/custAqShe\nz25Zm9n5AgMBAAECggEAAzx2sF1oFV6jSV3h1rmJqhwcMbqWX9mcDhGxWinAbotA\nmoAwOq9xn/KBYs312ortC9CCE7h/1muha4DW9vPQxFNEY5z/auGnNm11sq0Nj9PQ\n/NGWMBrOp4D7zH3v3i6rJSxK/6pnxqBOYzoq9xhrGIfpeADortLGjILOMIGBCsev\np18+9198CB7KaB6RSxx9oftMkMmEQlPRFKLJ8sGfvuFj65V48dS/kMAlcY7N46w1\n/z5OMrcJP7/R4HQ147/yykFepfWgeRrAdAXivrs5knA1q4/h24LEgx857nQ+dVv4\nD4KcwvEjKjvL5rPDcWIwk+N5sWnlRjwI0urQFHSgDwKBgQD9XdcGLOvcXDLIMx0Z\nIGDTioNQVpBL1Lg1Kfwg/pwX87D6y88WBYZ31guJolb+72oL554mKgAGexFiuLV2\n5g/V9Y/nC4CFxLtjKXXPmFkZi0+k1kPAVd+wCJJ95MccOaBtNztfyWB9XCrP4exx\nlx+QKQ142oyKPemcflHhy4Ve+wKBgQDTvQUFfhNgDfWLpSKlxs/jp2itj4a/BbZf\nT9e2Gbk4UnwwNYe46ToRn9/3Mx8ttLysnjIZf0Rvq/9v7mBRfa0vNxNv3Xm4HNsJ\n3H4JERsWhPHiwk1XFxtGP5nIOqYKubfmRfGBgtq0YSIcdGOp9IyySAC8z7tHP04V\nx/lnO1KImwKBgCUWLFhaEPhDgqdtW/AGnkW4u7nxwdNnwsL9b0uBGWYkJJ7BYIGv\ns1wtN6kg2y0b7GDruWmKslBAiW3y7ZUG3gCKnlLKiziJcIh2VClb+obTrofJWUd5\nCnIg/xhweXi3MrVp5UYDGx2edSHSxyJlZZhbef5bt0CxCVX/44pymQYrAoGBAK6I\nP0xguQ3TU9SRATdO4uvPgbyW80YgKkz0XmXvXDqt20pNxZtJPCFs/Esiq4+cTG2p\nVLiprDq0tzCHeIOTqZ6isnXiRMPbnT3Kr2U/4Wk1msEE0oV4OXY1VMi0d0ud/JVm\nkATmXOqUqm50Dfb46sTGDz2Tqda3uuC/XriWMJkDAoGADjS0imYZoknLex+aAn7/\nDXU4hfHB6o5dzIzJ+Sgh5ttKYQ9yQ0w2LtfbSIgyfm03I3wtAWb589oAbRHsfdkK\ngkOFi3FqEd8JwaPhCEbAkqZYs/gkDT8acTuIvXPKZG5kx7dmD5kO1aq9r4vARXRZ\naRWBIWENPLnv+dcCNxYGfKU=\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-vf3ok@yumhub-api-c3646.iam.gserviceaccount.com",
      "client_id": "111067573500472922927",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-vf3ok%40yumhub-api-c3646.iam.gserviceaccount.com",
      "universe_domain": "googleapis.com"
    }
    
    

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });

    this.storage = admin.storage();
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    console.log(file);
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

  async sendNotification(message: admin.messaging.Message): Promise<void> {
    try {
      await admin.messaging().send(message);
      console.log('Notification sent successfully');
    } catch (error) {
      console.error('Failed to send notification:', error.message);
    }
  }
}
