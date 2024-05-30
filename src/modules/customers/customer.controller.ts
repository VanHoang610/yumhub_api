import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Param,
  Patch,
  HttpException,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CustomerDto } from 'src/dto/dto.customer';
import { CustomerServices } from './customer.service';
import mongoose from 'mongoose';
import { RegisterCustomerDto } from 'src/dto/dto.registerCustomer';
import { UpdateCustomerDto } from 'src/dto/dto.updateCustomer';
import { LoginDto } from 'src/dto/dto.login';
import { AuthGuard } from 'src/helper/auth.middleware';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerServices) {}

  // lấy rating
  @Get('rating')
  @UseGuards(AuthGuard)
  rating(@Query('id') id: string) {
    console.log('1');

    return this.customerService.getRating(id);
  }
  //addData
  @Get('addData')
  addData() {
    return this.customerService.addData();
  }

  @Get('newUser')
  newCustomer() {
    return this.customerService.newCustomerInMonth();
  }

  // tạo customer
  @Post('createCustomer')
  createUser(@Body(new ValidationPipe()) registerDto: RegisterCustomerDto) {
    return this.customerService.createUser(registerDto);
  }

  // lấy customer theo id
  @Get('')
  @UseGuards(AuthGuard)
  getCustomerByID(@Query('id') id: string) {
    return this.customerService.getCustomerById(id);
  }

  // lấy tất cả customer
  @Get('getAllCustomer')
  @UseGuards(AuthGuard)
  getCustomer() {
    return this.customerService.getCustmer();
  }

  // lấy SDT
  @Get('getPhoneNumber')
  @UseGuards(AuthGuard)
  getPhoneNumber(@Query('id') id: string) {
    return this.customerService.getPhoneNumber(id);
  }

  // xóa customer
  @Get('deleteCustomer')
  @UseGuards(AuthGuard)
  deleteCustomer(@Query('id') id: string) {
    return this.customerService.deleteCustomer(id);
  }

  // sửa customer
  @Patch('updateCustomer')
  @UseGuards(AuthGuard)
  async updateCustomer(
    @Query('id') id: string,
    @Body(new ValidationPipe()) updateCustomer: UpdateCustomerDto,
  ) {
    return await this.customerService.updateCustomer(id, updateCustomer);
  }

  // lấy dánh sách lịch sử theo id
  @Get('getHistoryCustomer')
  @UseGuards(AuthGuard)
  getHistoryById(@Query('id') id: string) {
    return this.customerService.getHistoryById(id);
  }

  //login
  @Post('login')
  login(@Body(new ValidationPipe()) users: LoginDto) {
    return this.customerService.login(users);
  }

  //quên mật khẩu bằng Email
  @Post('forgetPassByEmail')
  forgetPasswordByEmail(@Body() body: { email: string }) {
    const { email } = body;

    return this.customerService.forgetPassByEmail(email);
  }

  //kiểm tra OTP
  @Post('checkOTP')
  checkOTP(@Body() body: { email: string; otp: string }) {
    const { email, otp } = body;
    return this.customerService.checkOTP(email, otp);
  }

  //cập nhật mật khẩu
  @Post('resetPass')
  resetPass(@Query('id') id: string, @Body() body: { password: string }) {
    const { password } = body;
    return this.customerService.resetPass(id, password);
  }

  //đổi mật khẩu
  @Post('changePass')
  @UseGuards(AuthGuard)
  changePassword(
    @Query('id') id: string,
    @Body() body: { passOld: string; passNew: string },
  ) {
    const { passOld, passNew } = body;
    return this.customerService.changePass(id, passOld, passNew);
  }

  // lấy order của customer
  @Post('getOrderByStatus')
  @UseGuards(AuthGuard)
  getOrderByStatus(@Body() body: { customerID: string; status: number }) {
    const { customerID, status } = body;
    return this.customerService.getOrderByStatus(customerID, status);
  }

  //tìm kiếm customer
  @Post('findCustomer')
  @UseGuards(AuthGuard)
  findCustomer(@Body() body: { keyword: string }) {
    const { keyword } = body;
    return this.customerService.getCustomersBySearch(keyword);
  }
}
