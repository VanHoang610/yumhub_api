import { Controller, Post, Body, Get } from '@nestjs/common'
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from 'src/dto/dto.createVoucher';

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
            console.log(voucher);
            return voucher;
        } catch (error) {
            console.error("Create Voucher Fail", error)
        }
    }
}