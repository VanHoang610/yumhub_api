import { Injectable } from "@nestjs/common/decorators/core";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LoginDto } from "src/dto/dto.login";
import { UserDto } from "src/dto/dto.uses";
import { User } from "src/schemas/user.schemas";
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
// import * as twilio from 'twilio';
import * as nodemailer from 'nodemailer'
import { ResetPassword } from "src/schemas/resetPass.schema";
import { Mailer } from "src/helper/mailer";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private users: Model<User>,
        @InjectModel(ResetPassword.name) private resetPassModel: Model<ResetPassword>) { }


    //tạo user
    createUser(userDto: UserDto) {
        const newUser = new this.users(userDto)
        return newUser.save();
    }

    //lấy tất cả user
    async getAllUser() {
        try {
            const users = await this.users.find();
            if (!users) throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
            return { result: true, users: users }
        } catch (error) {
            return { result: false, users: error }
        }
    }


    //login
    async login(user: LoginDto) {
        try {
            const checkAccount = await this.users.findOne({ phoneNumber: user.phoneNumber });
            if (!checkAccount) throw new HttpException("Không đúng SDT", HttpStatus.NOT_FOUND);
            const compare = await bcrypt.compare(user.password, checkAccount.password);
            if (!compare) throw new HttpException("Không đúng mật khẩu", HttpStatus.NOT_FOUND);

            return { result: true, message: "Đăng nhập thành công" }
        } catch (error) {
            return { result: true, message: "Đăng nhập thất bại" }
        }
    }

    async register(user: UserDto) {
        try {
            const checkPhone = await this.users.findOne({ phoneNumber: user.phoneNumber });

            if (checkPhone) throw new HttpException("SDT đã được đăng ký", HttpStatus.NOT_FOUND);

            const hashedPassword = await bcrypt.hash(user.password, 10);
            const createUser = new this.users({ ...user, password: hashedPassword });
            await createUser.save();
            return { result: true, register: createUser }
        } catch (error) {
            return { result: false, register: error }
        }
    }

    async forgetPassByEmail(email: string) {
        try {
            const user = await this.users.findOne({ email: email });
            if (!user) throw new HttpException("Email chưa đăng ký", HttpStatus.NOT_FOUND);

            const otp = Math.floor(1000 + Math.random() * 9000);

            const passwordRest = new this.resetPassModel({ email: email, otp: otp })
            await passwordRest.save();

            await Mailer.sendMail({
                email: user.email,
                subject: "Khôi phục mật khẩu",
                content: `Mã OTP của bạn là: ${otp}`
            });

            setTimeout(async () => {
                await this.resetPassModel.deleteOne({ email: email });
            }, 120000);

            return { result: true, message: "Hãy kiểm tra email của bạn!" }

        } catch (error) {
            return { result: false, message: "Gửi OTP thất bại" }
        }
    }

    async checkOTP(email: string, otp: string) {
        try {
            const user = await this.resetPassModel.findOne({ email: email, otp: otp });
            console.log(user);

            if (!user) throw new HttpException('Không tìm thấy OTP', HttpStatus.NOT_FOUND);

            await this.resetPassModel.deleteOne({ email: email });
            return { result: true, message: "Xác nhận OTP thành công" }
        } catch (error) {
            return { result: false, message: "OTP thất bại" }

          
        }
    }

    async resetPass(id: string, password: string) {
        try {
            const user = await this.users.findById(id);
            if (!user) throw new HttpException("Không tìm thấy tài khoản", HttpStatus.NOT_FOUND);

            const passwordNew = await bcrypt.hash(password, 10);

            user.password = passwordNew
            user.save();
            return { result: true, message: "Cập nhật mật khẩu thành công" }
        } catch (error) {
            return { result: false, message: "Cập nhật mật khẩu thất bại" }
        }
    }

    async changePass(id: string, passOld: string, passNew: string) {
        try {
            const existingUser = await this.users.findById(id);
            if (!existingUser) throw new HttpException("Không tìm thấy tài khoản", HttpStatus.NOT_FOUND);

            const compare = await bcrypt.compare(passOld, existingUser.password);
            if (!compare) throw new HttpException("Không đúng mật khẩu", HttpStatus.NOT_FOUND);

            const hashPassNew = await bcrypt.hash(passNew, 10);
            console.log(hashPassNew);

            existingUser.password = hashPassNew;
            existingUser.save();
            return { result: true, message: "Đổi mật khẩu thành công" }
        } catch (error) {
            return { result: false, message: "Đổi mật khẩu không thành công" }
        }
    }
    

}
