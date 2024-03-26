import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { Image, ImageSchema  } from 'src/schemas/image.schema';


@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name: Image.name,
                schema: ImageSchema
            }
        ]),
    ],
    controllers: [UploadController],
    providers: [UploadService]
})
export class uploadModule { };