import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ShipperService } from './shipper.service';
import { ShipperDto } from 'src/dto/dto.shipper';
import mongoose from 'mongoose';
import { RegisterShipperDto } from 'src/dto/dto.registerShipper';
import { LoginDto } from 'src/dto/dto.login';
import { HistoryMerchantDto } from 'src/dto/dto.historyMerchant';
import { AuthGuard } from 'src/helper/auth.middleware';
import { RolesGuard } from 'src/helper/checkRole.middleware';

@Controller('shippers')
export class ShipperController {
  constructor(private readonly shipperService: ShipperService) {}

  @Get('newUser')
  @UseGuards(AuthGuard)
  newShipper() {
    return this.shipperService.newShipperInMonth();
  }

  @Post('RevenueWeek')
  @UseGuards(AuthGuard)
  getRevenueWeek(@Body() body: { ID: string }) {
    try {
      const { ID } = body;
      const totalRevenue = this.shipperService.getRevenueWeek(ID);
      if (!totalRevenue) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      return totalRevenue;
    } catch (error) {
      return error;
    }
  }
  @Post('RevenueMonth')
  @UseGuards(AuthGuard)
  getRevenueMonth(@Body() body: { ID: string; month: string }) {
    try {
      const { ID, month } = body;
      const totalRevenue = this.shipperService.getRevenueMonth(ID, month);
      if (!totalRevenue) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      return totalRevenue;
    } catch (error) {
      return error;
    }
  }
  @Post('RevenueTTT')
  @UseGuards(AuthGuard)
  getRevenueTime(
    @Body() body: { ID: string; startDate: string; endDate: string },
  ) {
    try {
      const { ID, startDate, endDate } = body;
      const totalRevenue = this.shipperService.revenueShipperTimeTwoTime(
        ID,
        startDate,
        endDate,
      );
      if (!totalRevenue)
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      return totalRevenue;
    } catch (error) {
      return error;
    }
  }

  // add Data
  @Get('addData')
  addData() {
    try {
      const shipper = this.shipperService.addData();
      return shipper;
    } catch (error) {
      console.error('Create Shipper Fail', error);
    }
  }

  // tạo shipper
  @Post('createShipper')
  createShipper(@Body() shippers: RegisterShipperDto) {
    try {
      const shipper = this.shipperService.createShipper(shippers);
      return shipper;
    } catch (error) {
      console.error('Create Shipper Fail', error);
    }
  }

  //lấy tất cả shipper
  @Get('getAllShipper')
  @UseGuards(AuthGuard)
  getAllShipper() {
    try {
      const shipper = this.shipperService.getAllShipper();
      if (!shipper) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      return shipper;
    } catch (error) {
      return error;
    }
  }

  //lấy lịch sử shipper
  @Get('getHistoryOrder')
  @UseGuards(AuthGuard)
  getHistoryShipper(@Query('id') id: string) {
    try {
      const shipper = this.shipperService.getHistory(id);
      if (!shipper) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      return shipper;
    } catch (error) {
      return { result: false, error };
    }
  }

  // sửa location của shipper
  @Patch('updateLocation')
  @UseGuards(AuthGuard)
  updateLocation(
    @Query('id') id: string,
    @Body() body: { longitude: number; latitude: number },
  ) {
    try {
      const { longitude, latitude } = body;
      const review = this.shipperService.updateLocation(
        id,
        longitude,
        latitude,
      );
      return review;
    } catch (error) {
      console.error('Update location fail', error);
    }
  }

  // @Get('getPhoneNumberShipper/:id')
  // getPhoneNumberShipper(@Param('id') id: string){
  //     return this.shipperService.getPhoneNumberShipper(id);
  // }

  @Post('deleteShipper')
  @UseGuards(AuthGuard)
  deleteShipper(@Query('id') id: string) {
    return this.shipperService.deleteShipper(id);
  }

  @Post('data-recovery-Shipper')
  @UseGuards(AuthGuard)
  reActiveMerchant(@Query('id') id: string) {
    return this.shipperService.dataRecoveryShipper(id);
  }


  @Patch('updateShipper')
  @UseGuards(AuthGuard)
  async updateShipper(
    @Query('id') id: string,
    @Body(new ValidationPipe()) updateShipper: ShipperDto,
  ) {
    return await this.shipperService.updateShipper(id, updateShipper);
  }

  //login
  @Post('login')
  login(@Body(new ValidationPipe()) login: LoginDto) {
    return this.shipperService.login(login);
  }

  //quên mật khẩu bằng Email
  @Post('forgetPassByEmail')
  forgetPasswordByEmail(@Body() body: { email: string }) {
    const { email } = body;

    return this.shipperService.forgetPassByEmail(email);
  }

  //kiểm tra OTP
  @Post('checkOTP')
  checkOTP(@Body() body: { email: string; otp: string }) {
    const { email, otp } = body;
    return this.shipperService.checkOTP(email, otp);
  }

  //cập nhật mật khẩu
  @Post('resetPass')
  resetPass(@Body() body: { email: string; password: string }) {
    const { password, email } = body;
    return this.shipperService.resetPass(email, password);
  }

  //đổi mật khẩu
  @Post('changePass')
  @UseGuards(AuthGuard)
  changePassword(
    @Query('id') id: string,
    @Body() body: { passOld: string; passNew: string },
  ) {
    const { passOld, passNew } = body;
    return this.shipperService.changePass(id, passOld, passNew);
  }

  //gửi email xác thực
  @Post('verifileShipper')
  verifileShipper(@Body() body: { email: string }) {
    const { email } = body;
    return this.shipperService.verifileShipper(email);
  }

  // danh sách shipper cần duyệt
  @Get('listShipperApproval')
  @UseGuards(AuthGuard)
  listShipperApproval() {
    return this.shipperService.listShipperApproval();
  }

  // chi tiết tài khoản merchant
  @Get('getShipperById')
  @UseGuards(AuthGuard)
  getShipperById(@Query('id') id: string) {
    return this.shipperService.getShipperById(id);
  }

  // nạp tiền shipper
  @Post('topUp')
  @UseGuards(AuthGuard)
  topUpShipper(@Query('id') id: string, @Body() topUp: HistoryMerchantDto) {
    return this.shipperService.topUpShipper(id, topUp);
  }

  // rút tiền shipper
  @Post('cashOut')
  @UseGuards(AuthGuard)
  cashOutMtopUpShipper(
    @Query('id') id: string,
    @Body() topUp: HistoryMerchantDto,
  ) {
    return this.shipperService.cashOutShipper(id, topUp);
  }

  // lịch sử nạp/rút tiền shipper
  @Get('transactionHistory')
  @UseGuards(AuthGuard)
  transactionHistory(@Query('id') id: string) {
    return this.shipperService.transactionHistory(id);
  }

  @Get('rating')
  @UseGuards(AuthGuard)
  rating(@Query('id') id: string) {
    return this.shipperService.getRating(id);
  }

  //check giấy tờ bằng lái xe
  @Post('checkDriverLicenseDocument')
  @UseGuards(AuthGuard)
  checkDriverLicenseDocument(@Body() body: { image: string }) {
    const { image } = body;
    return this.shipperService.checkDriverLicenseDocument(image);
  }

  // lấy ra tất cả giấy tờ của shipper
  @Get('getAllDocument')
  @UseGuards(AuthGuard)
  getAllDocument(@Query('id') id: string) {
    return this.shipperService.getAllDocument(id);
  }

  //tìm kiếm shipper
  @Post('findShipper')
  @UseGuards(AuthGuard)
  findShipper(@Body() body: { keyword: string }) {
    const { keyword } = body;
    return this.shipperService.findShipper(keyword);
  }

  //tìm kiếm shipper đã xóa
  @Post('findDeletedShipper')
  @UseGuards(AuthGuard)
  findDeletedShipper(@Body() body: { keyword: string }) {
    const { keyword } = body;
    return this.shipperService.findDeletedShipper(keyword);
  }

  //tìm kiếm shipper đang phê duyệt
  @Post('findApproveShipper')
  @UseGuards(AuthGuard)
  findApproveShipper(@Body() body: { keyword: string }) {
    const { keyword } = body;
    return this.shipperService.findApproveShipper(keyword);
  }

  @Get('listShipperIsDeleted')
  @UseGuards(AuthGuard)
  listShipperIsDeleted() {
    return this.shipperService.getShipperIsDeleted();
  }

  //lấy tất cả danh sách đang chờ duyệt rút tiền
  @Get('getListAwaitingApproval')
  @UseGuards(AuthGuard)
  getListAwaitingApproval() {
    return this.shipperService.getListAwaitingApproval();
  }

  //duyệt tài khoản rút tiền
  @Get('approvalCashOut')
  @UseGuards(AuthGuard)
  approvalCashOut(@Query('id') id: string) {
    return this.shipperService.approvalCashOut(id);
  }

  // kiểm duyệt rút tiền
  @Get('withdrawalApproval')
  @UseGuards(AuthGuard, RolesGuard)
  withdrawalApproval(@Query('id') id: string) {
    return this.shipperService.withdrawalApproval(id);
  }

  // list rút tiền của shipper
  @Get('listWithdrawalApproval')
  @UseGuards(AuthGuard, RolesGuard)
  listWithdrawalApproval() {
    return this.shipperService.listWithdrawalApproval();
  }

  // tìm kiếm rút tiền shipper
  @Post('findWithdrawalShipper')
  @UseGuards(AuthGuard)
  findWithdrawalShipper(@Body() body: { keyword: string }) {
    const { keyword } = body;
    return this.shipperService.findWithdrawalShipper(keyword);
  }
}
