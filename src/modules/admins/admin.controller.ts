import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { AdminService } from './admin.service';
import { LoginDto } from 'src/dto/dto.login';
import { LoginAdminDto } from 'src/dto/dto.loginAdmin';
import { AuthGuard } from '../../helper/auth.middleware';


@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }
    
    @Get('addData')
    addData () {
        return this.adminService.addData();
    }
    
    //login admin
    @Post('loginAdmin')
    loginAdmin(@Body() login: LoginAdminDto) {
        return this.adminService.loginAdmin(login);
    }

    //quên mật khẩu bằng Email
    @Post('forgetPassByEmail')
    forgetPasswordByEmail(@Body() body: { email: string }) {
        const { email } = body;
        return this.adminService.forgetPassByEmail(email);
    }

    //kiểm tra OTP
    @Post('checkOTP')
    checkOTP(@Body() body: { email: string, otp: string }) {
        const { email, otp } = body;
        return this.adminService.checkOTP(email, otp);
    }

    //cập nhật mật khẩu
    @Post('resetPass')
    resetPass(@Body() body: { email: string, password: string }) {
        const { email, password } = body;
        return this.adminService.resetPass(email, password);
    }


    //đổi mật khẩu
    @Post('changePass/:id')
    @UseGuards(AuthGuard)
    changePassword(@Param('id') id: string, @Body() body: { passOld: string, passNew: string }) {
        const { passOld, passNew } = body;
        return this.adminService.changePass(id, passOld, passNew);
        
    }
}