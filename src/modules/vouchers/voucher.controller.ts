import {
  Controller,
  Post,
  Body,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Param,
  ValidationPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from 'src/dto/dto.createVoucher';
import mongoose from 'mongoose';
import { AuthGuard } from 'src/helper/auth.middleware';
import { UpdateVoucherDto } from 'src/dto/dto.updateVoucher';
import { RolesGuard } from 'src/helper/checkRole.middleware';

@Controller('vouchers')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  //add data
  @Get('addData')
  addData() {
    try {
      const voucher = this.voucherService.addData();
      return voucher;
    } catch (error) {
      console.error('Create Voucher Fail', error);
    }
  }
  //tạo voucher
  @Post('createVoucher')
  @UseGuards(AuthGuard)
  createVoucher(@Body() createVoucher: CreateVoucherDto) {
    try {
      const voucher = this.voucherService.createVoucher(createVoucher);
      return voucher;
    } catch (error) {
      console.error('Create Voucher Fail', error);
    }
  }

  @Get('allVoucher')
  @UseGuards(AuthGuard)
  getAllVoucher() {
    try {
      const voucher = this.voucherService.getAllVoucher();
      if (!voucher) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      return voucher;
    } catch (error) {
      return error;
    }
  }
  @Get('valid')
  @UseGuards(AuthGuard)
  async getValidVoucher() {
    try {
      const vouchers = await this.voucherService.findValidVoucher();
      if (!vouchers || vouchers.length === 0) {
        throw new HttpException(
          'No valid vouchers found',
          HttpStatus.NOT_FOUND,
        );
      }
      return vouchers;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Patch('updateVoucher')
  @UseGuards(AuthGuard)
  async updateShipper(
    @Query('id') id: string,
    @Body(new ValidationPipe()) updateVoucher: UpdateVoucherDto,
  ) {
    console.log(updateVoucher);
    return await this.voucherService.updateVoucher(id, updateVoucher);
  }

  //tìm kiếm voucher
  @Post('findVoucher')
  @UseGuards(AuthGuard)
  findVoucher(@Body() body: { keyword: string }) {
    const { keyword } = body;
    return this.voucherService.findVoucher(keyword);
  }

  //tìm kiếm voucher theo id
  @Get('getVoucherById')
  @UseGuards(AuthGuard)
  getVoucherById(@Query('id') id: string) {
    return this.voucherService.getVoucherById(id);
  }

  // lấy ra tất cả typeOfVoucher
  @Get('getTypeOfVoucher')
  @UseGuards(AuthGuard)
  getTypeOfVoucher() {
    return this.voucherService.getTypeOfVoucher();
  }
}
