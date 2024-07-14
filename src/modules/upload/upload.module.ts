import { Module } from '@nestjs/common';
import { UploadController, NotificationController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  controllers: [UploadController,NotificationController],
  providers: [UploadService],
})
export class UploadModule {}
