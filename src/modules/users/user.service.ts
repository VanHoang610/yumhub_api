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
    getAllUser() {
        return this.users.find();
    }


    //login
    async login(user: LoginDto) {
        try {
            const checkAccount = await this.users.findOne({ phoneNumber: user.phoneNumber });
            if (!checkAccount) throw new HttpException("Không đúng SDT", HttpStatus.NOT_FOUND);
            const compare = await bcrypt.compare(user.password, checkAccount.password);
            if (!compare) throw new HttpException("Không đúng mật khẩu", HttpStatus.NOT_FOUND);

            return { Message: "Đăng nhập thành công" }

        } catch (error) {
            return { Message: "Đăng nhập thất bại" }
        }
    }

    async register(user: UserDto) {
        try {
            const checkPhone = await this.users.findOne({ phoneNumber: user.phoneNumber });
            console.log(user.phoneNumber);

            if (checkPhone) throw new HttpException("SDT đã được đăng ký", HttpStatus.NOT_FOUND);

            const hashedPassword = await bcrypt.hash(user.password, 10);
            const createUser = new this.users({ ...user, password: hashedPassword });
            createUser.save();
            return { "Đăng ký thành công": createUser }
        } catch (error) {
            return { "Đăng ký thất bại": error };
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

            return { Message: "Hãy kiểm tra Email của bạn!" }

        } catch (error) {
            return { Message: "Gửi OTP thất bại" }
        }
    }

    async checkOTP(email: string, otp: string) {
        try {
            const user = await this.resetPassModel.findOne({ email: email, otp: otp });
            console.log(user);
            
            if (!user) throw new HttpException('Không tìm thấy OTP', HttpStatus.NOT_FOUND);

            await this.resetPassModel.deleteOne({ email: email });
            return { Message: "Xác nhận OTP thành công" }

        } catch (error) {
            return { Message: "OTP thất bại", error }
        }
    }

    async resetPass(id: string, password: string) {
        try { 
            const user = await this.users.findById(id);
            if(!user) throw new HttpException("Không tìm thấy tài khoản", HttpStatus.NOT_FOUND);

            const passwordNew = await bcrypt.hash(password, 10);

            user.password = passwordNew
            user.save();
            
            return { Message: "Cập nhật mật khẩu thành công" };
        } catch (error) {
            return { Message: "Cập nhật mật khẩu thất bại" };
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
            return { Message: "Đổi mật khẩu thành công" }
        } catch (error) {
            console.error("Đổi mật khẩu không thành công", error);
            throw error;
        }
    }

}
