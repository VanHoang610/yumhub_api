import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { MerchantService } from './merchant.service';
import { MerchantDto } from 'src/dto/dto.merchant';
import mongoose from 'mongoose';

@Controller('merchants')
export class MerchantController {
    constructor(private merchantService: MerchantService) { }
    @Post()
    @UsePipes(new ValidationPipe())
    createMerchant(@Body() merchantDto: MerchantDto) {
        return this.merchantService.createMerchant(merchantDto);
    }
    @Get(':id')
    getMerchantByID(@Param('id') id: string) {
        return this.merchantService.getMerchantById(id);
    }
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
}
