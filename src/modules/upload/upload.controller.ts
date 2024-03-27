
import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { imageDto } from 'src/dto/dto.image';
import { storageConfig } from 'src/helper/config';
import { extname } from 'path';

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   return this.uploadService.uploadImage(file);
  // }

  // @Post('/file')
  // @UseInterceptors(FileInterceptor("file"))
  // handleUpload(@UploadedFile()file: Express.Multer.File){

  //   console.log("file",file)

  //   return "File upload api"
  // }
// uploadFileAndPassValidation(

//   @UploadedFile(
//     // new ParseFilePipe({
//     //   validators: [
//     //     new MaxFileSizeValidator({ maxSize: 1000 }),
//     //     new FileTypeValidator({ fileType: 'image/png' }),
//     //   ]
//     // })
//   )
//   file: Express.Multer.File,
// ) {
//   return 
//     "file upload API"
//     // body,
//     // file: file.buffer.toString(),
//   ;
// }
}
