import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common'
import { AdminService } from './admin.service';
import { LoginDto } from 'src/dto/dto.login';
import { LoginAdminDto } from 'src/dto/dto.loginAdmin';
import { AuthGuard } from '../../helper/auth.middleware';
import { CreateAdminDto } from 'src/dto/dto.createAdmin';
import { updateAdminDto } from 'src/dto/dto.updateAdmin';
import { updateEmployeeDto } from 'src/dto/dto.updateEmployee';


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
    @Post('changePass')
    @UseGuards(AuthGuard)
    changePassword(@Query('id') id: string, @Body() body: { passOld: string, passNew: string }) {
        const { passOld, passNew } = body;
        return this.adminService.changePass(id, passOld, passNew);
        
    }

    @Get('showAll')
    @UseGuards(AuthGuard)
    showAll() {
        return this.adminService.showAll();
    }

    @Post('createAdmin')
    @UseGuards(AuthGuard)
    createAdmin(@Body() admin: CreateAdminDto, @Req() req: Request) {
        admin.createdBy = req['user']._id;
        admin.createdAt = new Date();
        return this.adminService.createAdmin(admin);
    }

    @Get('search')
    @UseGuards(AuthGuard)
    searchAdmin(@Query('search') search: string) {
        return this.adminService.searchAdmin(search);
    }
    
    @Post('deleteAdmin')
    @UseGuards(AuthGuard)
    deleteAdmin(@Query('id') id: string) {
        return this.adminService.deleteAdmin(id);
    }

    @Post('updateAdmin')
    @UseGuards(AuthGuard)
    updateAdmin(@Query('id') id: string, @Body() admin: updateAdminDto) {
        return this.adminService.updateAdmin(id, admin);
    }

    @Post('updateEmployee')
    @UseGuards(AuthGuard)
    updateEmployee(@Query('id') id: string, @Body() admin: updateEmployeeDto, @Req() req: Request) {
        admin.updatedAt = new Date();
        admin.updatedBy = req['user'].id;
        return this.adminService.updateEmployee(id, admin);
    }
}