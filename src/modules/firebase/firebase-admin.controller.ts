import { Controller, Post, Body } from '@nestjs/common';
import { FirebaseService } from './firebase-admin.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly firebaseAdminService: FirebaseService) {}

  @Post('send')
  async sendNotification(
    @Body('token') token: string,
    @Body('title') title: string,
    @Body('body') body: string,
  ) {
    const payload = {
      notification: {
        title,
        body,
      },
    };
    return this.firebaseAdminService.sendNotification(token, payload);
  }
}
