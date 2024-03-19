import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common'
import { ShipperService } from './shipper.service';
import { ShipperDto } from 'src/dto/dto.shipper';
import mongoose from "mongoose";
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from "path";
import { storageConfig } from 'src/helpers/config';
import { extname } from 'path';


@Controller('shippers')
export class ShipperController {

    constructor(private readonly shipperService: ShipperService) { }
    @Post()
    createShipper(@Body(new ValidationPipe()) shipperDto: ShipperDto) {
        return this.shipperService.createShipper(shipperDto);
    }
    @Get(':id')
    getShipperByID(@Param('id') id: string){
        return this.shipperService.getShipperById(id).populate('userID');
    }
    @Get()
    getShipper(){
        return this.shipperService.getShipper();
    }

    // @Get('getPhoneNumberShipper/:id')
    // getPhoneNumberShipper(@Param('id') id: string){
    //     return this.shipperService.getPhoneNumberShipper(id);
    // }

    @Post('deleteShipper/:id')
    deleteShipper(@Param('id') id: string){
        return this.shipperService.deleteShipper(id);
    }

    @Patch('updateShipper/:id')
    async updateShipper(@Param('id') id: string, @Body(new ValidationPipe()) updateShipper: ShipperDto){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException("Invalid ID", 40);
        return  await this.shipperService.updateShipper(id, updateShipper);
    
    }

    // @Post("/uploadImage")
    // @UseInterceptors(FileInterceptor('image', {
    //     storage: diskStorage({
    //         destination:"",
    //         filename: (req, file, callBack) => {
    //             const fileName = path.parse(file.originalname).name.replace(/\s/g,'')+Date.now();
    //             const extension = path.parse(file.originalname).ext;
    //             callBack(null, '${fileName}${extension}');
    //         }
    //     })
    // }))
    // uploadFile(@Res() res, @UploadedFile() file){
    //     return res.status(HttpStatus.OK).json({
    //         Success: true,
    //         date: file.path
    //     })
    // }
    @Post("upload-avatar/:id") // Thêm :id vào đường dẫn URL để nhận id từ đường dẫn
    @UseInterceptors(FileInterceptor('avatar',{
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
    uploadAvatar(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): void{
        console.log("upload avatar");
        console.log(file);

        
        this.shipperService.updateAvatar(id, file.destination+'/'+file.filename); // Sử dụng id lấy từ đường dẫn URL
    }


}