import { Body, Controller, Delete, Get, Param, Patch, Post, Put, ValidationPipe } from "@nestjs/common";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { UserService } from "./user.service";
import { UserDto } from "src/dto/dto.uses";
import { LoginDto } from "src/dto/dto.login";

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    getAllUser() {
        return this.userService.getAllUser();
    }

    //login
    @Post('login')
    login(@Body(new ValidationPipe()) users: LoginDto) {
        return this.userService.login(users);
    }

    //register
    @Post('register')
    register(@Body(new ValidationPipe()) users: UserDto) {
        return this.userService.register(users);
    }

    //quên mật khẩu bằng Email
    @Post('forgetPassByEmail')
    forgetPasswordByEmail(@Body() body: { email: string }) {
        const { email } = body;

        return this.userService.forgetPassByEmail(email);
    }

    //kiểm tra OTP
    @Post('checkOTP')
    checkOTP(@Body() body: { email: string, otp: string }){
        const { email, otp } = body;
        return this.userService.checkOTP(email, otp);
    }

    //cập nhật mật khẩu
    @Post('resetPass/:id')
    resetPass(@Param('id') id: string, @Body() body: { password: string }){
        const { password } = body;
        return this.userService.resetPass(id, password);
    }


    //đổi mật khẩu
    @Post('changePass/:id')
    changePassword(@Param('id') id: string, @Body() body: { passOld: string, passNew: string }) {
        const { passOld, passNew } = body;
        return this.userService.changePass(id, passOld, passNew);
    }

    
}