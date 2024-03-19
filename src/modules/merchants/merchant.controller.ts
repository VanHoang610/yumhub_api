import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { MerchantService } from './merchant.service';
import { MerchantDto } from 'src/dto/dto.merchant';
import mongoose from 'mongoose';

@Controller('merchants')
export class MerchantController {
    constructor(private readonly merchantService: MerchantService) { }

    @Post()
    @UsePipes(new ValidationPipe())
    createMerchant(@Body() merchantDto: MerchantDto) {
        console.log(merchantDto);

        return this.merchantService.createMerchant(merchantDto);
    }

    // sắp xếp vị trí từ gần đến xa
    @Post('sortLocation')
    getLocation(@Body() body: {longitude: number, latitude: number}){
        const { longitude, latitude } = body;
        try {
            const merchant = this.merchantService.sortLocation(longitude, latitude);
            if(!merchant) throw new HttpException("Not found", HttpStatus.NOT_FOUND);
            return merchant;
        } catch (error) {
            return error
        }
    }
    
    @Get(':id')
    getMerchantByID(@Param('id') id: string) {
        return this.merchantService.getMerchantById(id);
    }

     

    // sắp xếp theo vị trí từ thấp đến cao
    @Get()
    getMerchant() {
        return this.merchantService.getMerchant();
    }
    @Post('deleteMerchant/:id')
    deleteCustomer(@Param('id') id: string) {
        return this.merchantService.deleteMerchant(id);
    }
    @Patch('updateMerchant/:id')
    async updateCustomer(@Param('id') id: string, @Body(new ValidationPipe()) updateMerchant: MerchantDto) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException("Invalid ID", 40);
        return await this.merchantService.updateMerchant(id, updateMerchant);

    }


    //lấy lịch sử merchant
    @Get('getHistoryOrder/:id')
    getHistoryShipper(@Param('id') id: string){
        try {
            const merchant = this.merchantService.getHistory(id);
            if(!merchant) throw new HttpException("Not found", HttpStatus.NOT_FOUND);
            return merchant;
        } catch (error) {
            return error
        }
    }

   
   
}
