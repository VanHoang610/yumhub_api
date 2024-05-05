import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe, NotFoundException, Query, UseGuards } from '@nestjs/common'


import { MerchantService } from './merchant.service';
import { MerchantDto } from 'src/dto/dto.merchant';
import mongoose from 'mongoose';
import { RegisterMerchatDto } from 'src/dto/dto.registerMerchant';
import { LoginDto } from 'src/dto/dto.login';
import { RegisterEmployeeDto } from 'src/dto/dto.registerEmployee';
import { UpdateUserMerchantDto } from 'src/dto/dto.updateUserMerchant';
import { HistoryMerchantDto } from 'src/dto/dto.historyMerchant';
import { AuthGuard } from 'src/helper/auth.middleware';

@Controller('merchants')
export class MerchantController {
    constructor(private readonly merchantService: MerchantService) { }

    @Post('RevenueWeek')
    @UseGuards(AuthGuard)
    getRevenueWeek(@Body() body: { ID: string }) {
        try {
            const { ID } = body
            const totalRevenue = this.merchantService.getRevenueWeek(ID);
            if (!totalRevenue) {
                throw new HttpException("Not found", HttpStatus.NOT_FOUND);
            }
            return totalRevenue;
        } catch (error) {
            return error;
        }
    }
    @Post('RevenueMonth')
    @UseGuards(AuthGuard)
    getRevenueMonth(@Body() body: { ID: string, month: string }) {
        try {
            const { ID, month } = body
            const totalRevenue = this.merchantService.getRevenueMonth(ID, month);
            if (!totalRevenue) {
                throw new HttpException("Not found", HttpStatus.NOT_FOUND);
            }
            return totalRevenue;
        } catch (error) {
            return error;
        }
    }
    @Post('RevenueTTT')
    @UseGuards(AuthGuard)
    getRevenueTime(@Body() body: { ID: string, startDate: string, endDate: string }) {
        try {
            const { ID, startDate, endDate } = body
            const totalRevenue = this.merchantService.revenueMerchantTimeTwoTime(ID, startDate, endDate);
            if (!totalRevenue) throw new HttpException("Not found", HttpStatus.NOT_FOUND);
            return totalRevenue;
        } catch (error) {
            return error
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
            console.error("Create Shipper Fail", error)
        }
    }

    // sắp xếp vị trí người dùng với cửa hàng từ gần đến xa
    @Post('sortLocation')
    @UseGuards(AuthGuard)
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
    @UseGuards(AuthGuard)
    getMerchantByID(@Param('id') id: string) {
        return this.merchantService.getMerchantById(id);
    }



    // // sắp xếp theo vị trí từ thấp đến cao
    @Get()
    @UseGuards(AuthGuard)
    getMerchant() {
        return this.merchantService.getMerchant();
    }

    @Post('deleteMerchant/:id')
    @UseGuards(AuthGuard)
    deleteCustomer(@Param('id') id: string) {
        return this.merchantService.deleteMerchant(id);
    }

    //lấy lịch sử merchant
    @Get('getHistoryOrder/:id')
    @UseGuards(AuthGuard)
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
    @UseGuards(AuthGuard)
    get5NearestShippers(@Param('id') id: string) {
        try {
            const merchant = this.merchantService.get5NearestShippers(id);
            if (!merchant) throw new HttpException("Not found", HttpStatus.NOT_FOUND);
            return merchant;
        } catch (error) {
            return error
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
        return this.merchantService.createMerchant(registerDto)
    }

    //quên mật khẩu bằng Email
    @Post('forgetPassByEmail')
    forgetPasswordByEmail(@Body() body: { email: string }) {
        const { email } = body;

        return this.merchantService.forgetPassByEmail(email);
    }

    //kiểm tra OTP
    @Post('checkOTP')
    checkOTP(@Body() body: { email: string, otp: string }) {
        const { email, otp } = body;
        return this.merchantService.checkOTP(email, otp);
    }

    //cập nhật mật khẩu
    @Post('resetPass/:id')
    resetPass(@Param('id') id: string, @Body() body: { password: string }) {
        const { password } = body;
        return this.merchantService.resetPass(id, password);
    }


    //đổi mật khẩu
    @Post('changePass/:id')
    @UseGuards(AuthGuard)
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


    // sửa tài khoản userMerchant
    @Patch('updateUserMerchant/:id')
    @UseGuards(AuthGuard)
    updateUserMerchant(@Param('id') id: string, @Body() update: UpdateUserMerchantDto) {
        return this.merchantService.updateUserMerchant(id, update);
    }

    // xóa tài khoản userMerchant
    @Post('deleteUserMerchant/:id')
    @UseGuards(AuthGuard)
    deleteUserMerchant(@Param('id') id: string) {
        return this.merchantService.deleteUserMerchant(id)
    }


    // danh sách merchant cần duyệt
    @Post('listMerchantApproval')
    @UseGuards(AuthGuard)
    listMerchantApproval() {
        return this.merchantService.listMerchantApproval();
    }

    // chi tiết tài khoản merchant
    @Get('getMerchantById/:id')
    @UseGuards(AuthGuard)
    getMerchantById(@Param('id') id: string) {
        return this.merchantService.getMerchantById(id);
    }

    // nạp tiền merchant
    @Post('topUp/:id')
    @UseGuards(AuthGuard)
    topUpMerchant(@Param('id') id: string, @Body() topUp: HistoryMerchantDto) {
        return this.merchantService.topUpMerchant(id, topUp);
    }

    // rút tiền merchant
    @Post('cashOut/:id')
    @UseGuards(AuthGuard)
    cashOutMerchant(@Param('id') id: string, @Body() topUp: HistoryMerchantDto) {
        return this.merchantService.cashOutMerchant(id, topUp);
    }

    // lịch sử nạp/rút tiền merchant
    @Get('transactionHistory/:id')
    @UseGuards(AuthGuard)
    transactionHistory(@Param('id') id: string) {
        return this.merchantService.transactionHistory(id);
    }


    // lấy tất cả food đang bán của merchant
    @Get('getFoodByMerchant/:id')
    @UseGuards(AuthGuard)
    getFoodByMerchant(@Param('id') id: string) {
        return this.merchantService.getFoodByMerchant(id)
    }
}