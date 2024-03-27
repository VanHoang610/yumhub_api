import { Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { storageConfig } from './helper/config';
import { extname } from 'path';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post("/upload")
  @UseInterceptors(FileInterceptor('file', {
    storage: storageConfig("avatarShipper"),
    fileFilter: (req, file, cb) => {
      const ext = extname(file.originalname);
      const allowedExArr =["jpg", "png", "jpeg"];
      if(!allowedExArr.includes(ext)){
          req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExArr.toString()}`;
          cb(null, false);
      }else{
          const fileSize = parseInt(req.headers['content-length']);
          if(fileSize > 1024 * 1024 * 5){
              req.fileValidationError =`file size is too large. Accepted file size is less 5 MB`;
              cb(null, false);
          }else{
              cb(null, true);
          }
      }
  }
  }))
  async uploadFile(){
    return "Success"
  }
}
