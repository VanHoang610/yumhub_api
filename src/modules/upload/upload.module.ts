import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { Image, ImageSchema  } from 'src/schemas/image.schema';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';


@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name: Image.name,
                schema: ImageSchema
            }
        ]),
        MulterModule.register({
            dest: join(__dirname, '..', 'uploads'), // Đường dẫn tới thư mục uploads
          }),
    ],
    controllers: [UploadController],
    providers: [UploadService]
})
export class uploadModule { };