import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('files')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = await this.uploadService.uploadFile(file);
    return { url: fileUrl };
  }
}
@Controller('notifications')
export class NotificationController {
  constructor(private readonly uploadService: UploadService) {}
  private tokens: string[] = [];

  @Post('save-token')
  async saveToken(@Body() body: { token: string }) {
    const { token } = body;

    if (!token) {
      throw new Error('Token is required');
    }

    this.tokens.push(token);
    console.log('Token saved:', token);
    return { message: 'Token saved successfully' };
  }
  
  @Post('send')
  async sendNotification(@Body() body: { token: string; message: string }) {
    const message = {
      notification: {
        title: 'New Notification',
        body: body.message,
      },
      token: body.token,
    };

    await this.uploadService.sendNotification(body.token, message);
  }
}


