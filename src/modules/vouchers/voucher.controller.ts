
import { Controller, Post, Body, Get, HttpException, HttpStatus, Patch, Param, ValidationPipe } from '@nestjs/common'
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from 'src/dto/dto.createVoucher';
import mongoose from 'mongoose';

@Controller('vouchers')
export class VoucherController {

    constructor(private readonly voucherService: VoucherService) { }

    //add data
    @Get('addData')
    addData() {
        try {
            const voucher = this.voucherService.addData();
            return voucher;
        } catch (error) {
            console.error("Create Voucher Fail", error)
        }
    }
    //tạo voucher
    @Post('createVoucher')
    createVoucher(@Body() createVoucher: CreateVoucherDto) {
        try {
            const voucher = this.voucherService.createVoucher(createVoucher);
            return voucher;
        } catch (error) {
            console.error("Create Voucher Fail", error)
        }
    }

    @Get('allVoucher')
    getAllVoucher(){
        try {
            const voucher = this.voucherService.getAllVoucher();
            if(!voucher) throw new HttpException("Not found", HttpStatus.NOT_FOUND);
            return voucher;
        } catch (error) {
            return error
        }
    }
    @Get('valid')
    async getValidVoucher() {
      try {
        const vouchers = await this.voucherService.findValidVoucher();
        if (!vouchers || vouchers.length === 0) {
          throw new HttpException('No valid vouchers found', HttpStatus.NOT_FOUND);
        }
        return vouchers;
      } catch (error) {
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    @Patch('updateVoucher/:id')
    async updateShipper(@Param('id') id: string, @Body(new ValidationPipe()) updateVoucher: CreateVoucherDto){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException("Invalid ID", 40);
        return  await this.voucherService.updateVoucher(id, updateVoucher);
    }
}