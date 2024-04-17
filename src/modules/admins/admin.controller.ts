import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { AdminService } from './admin.service';
import { LoginDto } from 'src/dto/dto.login';
import { LoginAdminDto } from 'src/dto/dto.loginAdmin';

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
    @Post('resetPass/:id')
    resetPass(@Param('id') id: string, @Body() body: { password: string }) {
        const { password } = body;
        return this.adminService.resetPass(id, password);
    }


    //đổi mật khẩu
    @Post('changePass/:id')
    changePassword(@Param('id') id: string, @Body() body: { passOld: string, passNew: string }) {
        const { passOld, passNew } = body;
        return this.adminService.changePass(id, passOld, passNew);
    }
}