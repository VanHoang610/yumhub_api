
import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { imageDto } from 'src/dto/dto.image';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller("files")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = await this.uploadService.uploadFile(file);
    return { url: fileUrl };
  }
}
