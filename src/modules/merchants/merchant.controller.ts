import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe, NotFoundException, Query } from '@nestjs/common'


import { MerchantService } from './merchant.service';
import { MerchantDto } from 'src/dto/dto.merchant';
import mongoose from 'mongoose';
import { RegisterMerchatDto } from 'src/dto/dto.registerMerchant';
import { LoginDto } from 'src/dto/dto.login';
import { RegisterEmployeeDto } from 'src/dto/dto.registerEmployee';

@Controller('merchants')
export class MerchantController {
    constructor(private readonly merchantService: MerchantService) { }
    @Get('RevenueWeek')
    getRevenueWeek(@Body() body: {ID:string}) {
        try {
            const {ID } = body
            const totalRevenue = this.merchantService.getRevenueWeek(ID);
            if (!totalRevenue) {
                throw new HttpException("Not found", HttpStatus.NOT_FOUND);
            }
            return totalRevenue;
        } catch (error) {
            return error;
        }
    }
    @Get('RevenueMonth')
    getRevenueMonth(@Body() body: {ID:string, month: string}) {
        try {
            const {ID , month} = body
            const totalRevenue = this.merchantService.getRevenueMonth(ID, month);
            if (!totalRevenue) {
                throw new HttpException("Not found", HttpStatus.NOT_FOUND);
            }
            return totalRevenue;
        } catch (error) {
            return error;
        }
    }
    @Get('RevenueTTT')
     getRevenueTime(@Body() body: {ID:string, startDate: string, endDate: string }) {
         try {
            const {ID, startDate, endDate } = body
             const totalRevenue = this.merchantService.revenueMerchantTimeTwoTime(ID, startDate, endDate);
             if (!totalRevenue) throw new HttpException("Not found", HttpStatus.NOT_FOUND);
             return totalRevenue;
         } catch (error) {
             return error
         }
     }
    
    @Get('addData')
    addData() 
    {
        try {
            const shipper = this.merchantService.addData();
            return shipper;
        } catch (error) {
            console.error("Create Shipper Fail", error)
        }
    }
    
    // sắp xếp vị trí người dùng với cửa hàng từ gần đến xa
    @Post('sortLocation')
    getLocation(@Body() body: { longitude: number, latitude: number }) {
        const { longitude, latitude } = body;
        try {
            const merchant = this.merchantService.sortLocation(longitude, latitude);
            if (!merchant) throw new HttpException("Not found", HttpStatus.NOT_FOUND);
            return merchant;
        } catch (error) {
            return error
        }
    }

    @Get(':id')
    getMerchantByID(@Param('id') id: string) {
        return this.merchantService.getMerchantById(id);
    }



    // // sắp xếp theo vị trí từ thấp đến cao
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
    getHistoryShipper(@Param('id') id: string) {
        try {
            const merchant = this.merchantService.getHistory(id);
            if (!merchant) throw new HttpException("Not found", HttpStatus.NOT_FOUND);
            return merchant;
        } catch (error) {
            return error
        }
    }

    //lấy 5 shipper gần cửa hàng nhất
    @Get('get5NearestShippers/:id')
    get5NearestShippers(@Param('id') id: string) {
        try {
            const merchant = this.merchantService.get5NearestShippers(id);
            if (!merchant) throw new HttpException("Not found", HttpStatus.NOT_FOUND);
            return merchant;
        } catch (error) {
            return error
        }

    }
    
     // tạo merchant
     @Post('createMerchant')
     createUser(@Body() registerDto: RegisterMerchatDto) {
        return this.merchantService.createMerchant(registerDto)
     }


     //login
     @Post('login')
     login(@Body(new ValidationPipe()) users: LoginDto) {
         return this.merchantService.login(users);
     }

     //quên mật khẩu bằng Email
    @Post('forgetPassByEmail')
    forgetPasswordByEmail(@Body() body: { email: string }) {
        const { email } = body;

        return this.merchantService.forgetPassByEmail(email);
    }

    //kiểm tra OTP
    @Post('checkOTP')
    checkOTP(@Body() body: { email: string, otp: string }){
        const { email, otp } = body;
        return this.merchantService.checkOTP(email, otp);
    }

    //cập nhật mật khẩu
    @Post('resetPass/:id')
    resetPass(@Param('id') id: string, @Body() body: { password: string }){
        const { password } = body;
        return this.merchantService.resetPass(id, password);
    }


    //đổi mật khẩu
    @Post('changePass/:id')
    changePassword(@Param('id') id: string, @Body() body: { passOld: string, passNew: string }) {
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
        return this.merchantService.createEmployee(registerDto)
     }
     /// doanh thu time to time
     
}