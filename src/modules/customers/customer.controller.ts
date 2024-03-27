import { Controller, Post, Body, ValidationPipe, Get, Param, Patch, HttpException, Delete } from "@nestjs/common";
import { CustomerDto } from "src/dto/dto.customer";
import { CustomerServices } from "./customer.service";
import mongoose from "mongoose";
import { retry } from "rxjs";
import { RegisterCustomerDto } from "src/dto/dto.registerCustomer";
import { UpdateCustomerDto } from "src/dto/dto.updateCustomer";
import { LoginDto } from "src/dto/dto.login";



@Controller('customers')
export class CustomerController {

    constructor(private readonly customerService: CustomerServices) { }

    // tạo customer
    @Post('createCustomer')
    createUser(@Body(new ValidationPipe()) registerDto: RegisterCustomerDto) {
        return this.customerService.createUser(registerDto)
    }

    // lấy customer theo id
    @Get(':id')
    getCustomerByID(@Param('id') id: string) {
        return this.customerService.getCustomerById(id);
    }

    // lấy tất cả customer
    @Get()
    getCustomer() {
        return this.customerService.getCustmer();
    }


    // lấy SDT 
    @Get('getPhoneNumber/:id')
    getPhoneNumber(@Param('id') id: string) {
        return this.customerService.getPhoneNumber(id);
    }


    // xóa customer
    @Post('deleteCustomer/:id')
    deleteCustomer(@Param('id') id: string){
        return this.customerService.deleteCustomer(id);
    }

    // sửa customer
    @Patch('updateCustomer/:id')
    async updateCustomer(@Param('id') id: string, @Body(new ValidationPipe()) updateCustomer: UpdateCustomerDto){
        return await this.customerService.updateCustomer(id, updateCustomer);
    }

    //  // lấy dánh sách lịch sử theo id
    //  @Get('getHistoryCustomer/:id')
    //  getHistoryById(@Param('id') id: string){
    //      return this.customerService.getHistoryById(id);
    //  }

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
    checkOTP(@Body() body: { email: string, otp: string }){
        const { email, otp } = body;
        return this.customerService.checkOTP(email, otp);
    }

    //cập nhật mật khẩu
    @Post('resetPass/:id')
    resetPass(@Param('id') id: string, @Body() body: { password: string }){
        const { password } = body;
        return this.customerService.resetPass(id, password);
    }


    //đổi mật khẩu
    @Post('changePass/:id')
    changePassword(@Param('id') id: string, @Body() body: { passOld: string, passNew: string }) {
        const { passOld, passNew } = body;
        return this.customerService.changePass(id, passOld, passNew);
    }
}


