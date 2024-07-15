import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  ValidationPipe,
  Query,
  UseGuards,
  Param,
} from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { RegisterMerchatDto } from 'src/dto/dto.registerMerchant';
import { LoginDto } from 'src/dto/dto.login';
import { RegisterEmployeeDto } from 'src/dto/dto.registerEmployee';
import { UpdateUserMerchantDto } from 'src/dto/dto.updateUserMerchant';
import { HistoryMerchantDto } from 'src/dto/dto.historyMerchant';
import { AuthGuard } from 'src/helper/auth.middleware';
import { MerchantDto } from 'src/dto/dto.merchant';

@Controller('merchants')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Patch('updateMerchant')
  @UseGuards(AuthGuard)
  updateMerchant(@Query('id') id: string, @Body() update: MerchantDto) {
    console.log(update);
    return this.merchantService.updateMerchant(id, update);
  }

  @Post('RevenueWeek')
  @UseGuards(AuthGuard)
  getRevenueWeek(@Body() body: { ID: string }) {
    try {
      const { ID } = body;
      const totalRevenue = this.merchantService.getRevenueWeek(ID);
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
      const totalRevenue = this.merchantService.getRevenueMonth(ID, month);
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
      const totalRevenue = this.merchantService.revenueMerchantTimeTwoTime(
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

  @Get('newUser')
  @UseGuards(AuthGuard)
  newMerchant() {
    return this.merchantService.newMerchantInMonth();
  }

  @Get('addData')
  addData() {
    try {
      const shipper = this.merchantService.addData();
      return shipper;
    } catch (error) {
      console.error('Create Shipper Fail', error);
    }
  }

  // sắp xếp vị trí người dùng với cửa hàng từ gần đến xa
  @Post('sortLocation')
  @UseGuards(AuthGuard)
  getLocation(@Body() body: { longitude: number; latitude: number }) {
    const { longitude, latitude } = body;
    try {
      const merchant = this.merchantService.sortLocation(longitude, latitude);
      if (!merchant) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      return merchant;
    } catch (error) {
      return error;
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  getMerchantByID(@Query('id') id: string) {
    return this.merchantService.getMerchantById(id);
  }

  @Get('getAllMerchant')
  @UseGuards(AuthGuard)
  getMerchant() {
    return this.merchantService.getMerchant();
  }

  @Post('deleteMerchant')
  @UseGuards(AuthGuard)
  deleteCustomer(@Query('id') id: string) {
    return this.merchantService.deleteMerchant(id);
  }

  //lấy lịch sử merchant
  @Get('getHistoryMerchant')
  @UseGuards(AuthGuard)
  getHistoryMerchant(@Query('id') id: string) {
    try {
      const merchant = this.merchantService.getHistoryMerchant(id);
      if (!merchant) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      return merchant;
    } catch (error) {
      return error;
    }
  }

  //lấy 5 shipper gần cửa hàng nhất
  @Get('get5NearestShippers')
  @UseGuards(AuthGuard)
  get5NearestShippers(@Query('id') id: string) {
    try {
      const merchant = this.merchantService.get5NearestShippers(id);
      if (!merchant) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      return merchant;
    } catch (error) {
      return error;
    }
  }

  //login
  @Post('login')
  login(@Body(new ValidationPipe()) users: LoginDto) {
    return this.merchantService.login(users);
  }

  // tạo merchant
  @Post('createMerchant')
  createUser(@Body() registerDto: RegisterMerchatDto) {
    return this.merchantService.createMerchant(registerDto);
  }

  //quên mật khẩu bằng Email
  @Post('forgetPassByEmail')
  forgetPasswordByEmail(@Body() body: { email: string }) {
    const { email } = body;

    return this.merchantService.forgetPassByEmail(email);
  }

  //kiểm tra OTP
  @Post('checkOTP')
  checkOTP(@Body() body: { email: string; otp: string }) {
    const { email, otp } = body;
    return this.merchantService.checkOTP(email, otp);
  }

  //cập nhật mật khẩu
  @Post('resetPass')
  resetPass(@Body() body: { email: string, password: string }) {
    const { password, email} = body;
    return this.merchantService.resetPass(email, password);
  }

  //đổi mật khẩu
  @Post('changePass')
  @UseGuards(AuthGuard)
  changePassword(
    @Query('id') id: string,
    @Body() body: { passOld: string; passNew: string },
  ) {
    const { passOld, passNew } = body;
    return this.merchantService.changePass(id, passOld, passNew);
  }

  //gửi email xác thực
  @Post('verifileMerchant')
  verifileMerchant(@Body() body: { email: string }) {
    const { email } = body;
    return this.merchantService.verifileMerchant(email);
  }

  // tạo tài khoản cho employee
  @Post('createEmployee')
  createEmployee(@Body() registerDto: RegisterEmployeeDto) {
    return this.merchantService.createEmployee(registerDto);
  }

  // sửa tài khoản userMerchant
  @Patch('updateUserMerchant')
  @UseGuards(AuthGuard)
  updateUserMerchant(@Query('id') id: string, @Body() update: UpdateUserMerchantDto) {
    return this.merchantService.updateUserMerchant(id, update);
  }

  // xóa tài khoản userMerchant
  @Post('deleteUserMerchant')
  @UseGuards(AuthGuard)
  deleteUserMerchant(@Query('id') id: string) {
    return this.merchantService.deleteUserMerchant(id);
  }

  // danh sách merchant cần duyệt
  @Get('listMerchantApproval')
  @UseGuards(AuthGuard)
  listMerchantApproval() {
    return this.merchantService.listMerchantApproval();
  }

  // chi tiết tài khoản merchant
  @Get('getMerchantById')
  @UseGuards(AuthGuard)
  getMerchantById(@Query('id') id: string) {
    return this.merchantService.getMerchantById(id);
  }

   // chi tiết tài khoản user merchant
   @Get('getUserMerchantById')
   @UseGuards(AuthGuard)
   getUserMerchantById(@Query('id') id: string) {
     return this.merchantService.getUserMerchantById(id);
   }

  // nạp tiền merchant
  @Post('topUp')
  @UseGuards(AuthGuard)
  topUpMerchant(@Query('id') id: string, @Body() topUp: HistoryMerchantDto) {
    return this.merchantService.topUpMerchant(id, topUp);
  }

  // rút tiền merchant
  @Post('cashOut')
  @UseGuards(AuthGuard)
  cashOutMerchant(@Query('id') id: string, @Body() topUp: HistoryMerchantDto) {
    return this.merchantService.cashOutMerchant(id, topUp);
  }

  // lịch sử nạp/rút tiền merchant
  @Get('transactionHistory')
  @UseGuards(AuthGuard)
  transactionHistory(@Query('id') id: string) {
    return this.merchantService.transactionHistory(id);
  }

  // lấy tất cả food đang bán của merchant
  @Get('getFoodByMerchant')
  @UseGuards(AuthGuard)
  getFoodByMerchant(@Query('id') id: string) {
    return this.merchantService.getFoodByMerchant(id);
  }

  // lấy tất cả food của merchant
  @Get('getFood')
  @UseGuards(AuthGuard)
  getFood(@Query('id') id: string) {
    return this.merchantService.getAllFoodByMerchant(id);
  }
  @Get('rating')
  @UseGuards(AuthGuard)
  rating(@Query('id') id: string) {
    return this.merchantService.getRating(id);
  }

  @Get('getAllTypeOfMerchant')
  @UseGuards(AuthGuard)
  getAllTypeOfMerchant() {
    return this.merchantService.getAllTypeOfMerchant();
  }

  @Post('getNearMerchant')
  @UseGuards(AuthGuard)
  getNearMerchant(@Query('id') id: string, @Body() body: { longitude?: number, latitude?: number }) {
    const { longitude, latitude } = body;
    if (!longitude && !latitude) {
      return this.merchantService.getNearMerchant(id);
    }
  
    return this.merchantService.getNearMerchant(id, longitude, latitude);
  }

  //tìm kiếm merchant
  @Post('findMerchant')
  @UseGuards(AuthGuard)
  findMerchant(@Body() body: { keyword: string }) {
    const { keyword } = body;
    return this.merchantService.findMerchant(keyword);
  }

  //tìm kiếm merchant đang phê duyệt
  @Post('findApproveMerchant')
  @UseGuards(AuthGuard)
  findApproveMerchant(@Body() body: { keyword: string }) {
    const { keyword } = body;
    return this.merchantService.findApproveMerchant(keyword);
  }

  //lấy tất cả merchant đã xóa
  @Get('getAllDeletedMerchant')
  @UseGuards(AuthGuard)
  getAllDeletedMerchant() {
    return this.merchantService.getAllDeletedMerchant();
  }

  //tìm kiếm merchant đã xóa
  @Post('findDeletedMerchant')
  @UseGuards(AuthGuard)
  findDeletedMerchant(@Body() body: { keyword: string }) {
    const { keyword } = body;
    return this.merchantService.findDeletedMerchant(keyword);
  }

  //check giấy tờ merchant
  @Post('checkIDCardDocument')
  @UseGuards(AuthGuard)
  checkIDCardDocument(@Body() body: { image: string }) {
    const { image } = body;
    return this.merchantService.checkIDCardDocument(image);
  }


  //lấy ra tất cả nhân viên của merchant
  @Get('listEmployeeMerchant')
  @UseGuards(AuthGuard)
  listEmployeeMerchant(@Query('id') id: string) {
    return this.merchantService.listEmployeeMerchant(id);
  }

  //lấy tất cả danh sách đang chờ duyệt rút tiền 
  @Get('getListAwaitingApproval')
  @UseGuards(AuthGuard)
  getListAwaitingApproval() {
    return this.merchantService.getListAwaitingApproval();
  }

 //duyệt tài khoản rút tiền  
 @Get('approvalCashOut')
 @UseGuards(AuthGuard)
 approvalCashOut(@Query('id') id: string) {
   return this.merchantService.approvalCashOut(id);
 }
}
