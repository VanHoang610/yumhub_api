import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from 'src/dto/dto.login';
import { Admin } from 'src/schemas/admin.schema';
import * as bcrypt from 'bcrypt';
import { HttpStatus, HttpException } from '@nestjs/common';
import { LoginAdminDto } from 'src/dto/dto.loginAdmin';
import { ResetPassword } from 'src/schemas/resetPass.schema';
import { Mailer } from 'src/helper/mailer';
import { CreateAdminDto } from 'src/dto/dto.createAdmin';
import { updateAdminDto } from 'src/dto/dto.updateAdmin';
import { updateEmployeeDto } from 'src/dto/dto.updateEmployee';
@Injectable()
export class AdminService {

    constructor(
        private jwtService: JwtService,
        @InjectModel(Admin.name) private adminModel: Model<Admin>,
        @InjectModel(ResetPassword.name) private resetPassModel: Model<ResetPassword>
    ) { }

    async addData() {
        try {
            const hashedPassword = await bcrypt.hash('123', 10);
            const addData = await this.adminModel.create([
                {
                    "_id": "661e46ccfc13ae5160ab8a18",
                    "userName": "admin",
                    "avatar": "adminNe.png",
                    "fullName": "Đoàn Thanh Hòa",
                    "gender": "Nam",
                    "password": hashedPassword,
                    "email": "hoangkun610@gmail.com"
                },
                {
                    "_id": "661e46ccfc13ae5160ab8a19",
                    "userName": "yumhub",
                    "avatar": "yumhubNe.png",
                    "fullName": "TeamWord",
                    "gender": "Nam",
                    "password": hashedPassword,
                    "email": "hoanglvps26283@fpt.edu.vn"
                }
            ])
            return { result: true, data: addData };
        } catch (error) {
            return { result: false, data: error };
        }
    }

    async loginAdmin(login: LoginAdminDto) {
        try {
            const admin = await this.adminModel.findOne({ userName: login.userName })
            if (!admin) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
            const compare = await bcrypt.compare(login.password, admin.password);
            if (!compare) throw new HttpException('Password wrong', HttpStatus.UNAUTHORIZED)
            // Tạo token
            const payload = {
                _id: admin._id,
                userName: admin.userName,
                email: admin.email,
                fullName: admin.fullName
            };
            const token = await this.jwtService.signAsync(payload);
            admin.password = undefined;
            return { result: true, data: { admin, token } };

        } catch (error) {
            return { result: false, data: error };
        }
    }

    async forgetPassByEmail(email: string) {
        try {
            const user = await this.adminModel.findOne({ email: email });
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
            if (!user) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
            await this.resetPassModel.deleteOne({ email: email });
            return { result: true, message: "Xác nhận OTP thành công" }
        } catch (error) {
            return { result: false, message: "OTP thất bại" }
        }
    }

    async resetPass(email: string, password: string) {
        try {
            const user = await this.adminModel.findOne({ email: email });
            const idUser = user._id;
            const findUser = await this.adminModel.findById(idUser);
            if (!findUser) throw new HttpException("Not Find Account", HttpStatus.NOT_FOUND);
            const passwordNew = await bcrypt.hash(password, 10);
            findUser.password = passwordNew
            findUser.save();
            return { result: true, data: findUser }
        } catch (error) {
            return { result: false, data: error }
        }
    }

    async changePass(id: string, passOld: string, passNew: string) {
        try {
            const existingUser = await this.adminModel.findById(id);
            if (!existingUser) throw new HttpException("Not Find Account", HttpStatus.NOT_FOUND);

            const compare = await bcrypt.compare(passOld, existingUser.password);
            if (!compare) throw new HttpException("Password Fail", HttpStatus.UNAUTHORIZED);

            const hashPassNew = await bcrypt.hash(passNew, 10);

            existingUser.password = hashPassNew;
            await existingUser.save();
            return { result: true, data: existingUser }
        } catch (error) {
            console.error("Error in changePass:", error);
            return { result: false, data: error }
        }
    }
    async showAll() {
        try {
            const admin = await this.adminModel.find();
            return { result: true, data: admin };
        } catch (error) {
            return { result: false, data: error };
        }
    }

    async createAdmin(admin: CreateAdminDto) {
        try {
            const checkEmail = await this.adminModel.findOne({ email: admin.email });
            if (checkEmail) throw new HttpException("Email đã tồn tại", HttpStatus.BAD_REQUEST);
            const checkPhone = await this.adminModel.findOne({ phoneNumber: admin.phoneNumber });
            if (checkPhone) throw new HttpException("SDT đã tồn tại", HttpStatus.BAD_REQUEST);
            const checkUsername = await this.adminModel.findOne({ userName: admin.userName });
            if (checkUsername) throw new HttpException("Username đã tồn tại", HttpStatus.BAD_REQUEST);
            const newAdmin = new this.adminModel(admin);
            const saveAdmin = await newAdmin.save();
            return { result: true, data: saveAdmin };
        } catch (error) {
            return { result: false, data: error };
        }
    }

    async searchAdmin(search: string) {
        try {
          const regex = new RegExp(search, 'i');
          
          // Aggregation pipeline để chuyển đổi _id thành chuỗi và áp dụng $regex
          const pipeline = [
            {
              $match: {
                $or: [
                  { fullName: regex },
                  { userName: regex },
                  { phoneNumber: regex },
                  { _idStr: { $regex: regex } }
                ]
              }
            },
            {
              $addFields: {
                _idStr: { $toString: "$_id" }
              }
            }
          ];
          
          const admin = await this.adminModel.aggregate(pipeline).exec();
    
          return { result: true, data: admin };
        } catch (error) {
          return { result: false, data: error };
        }
      }

    async deleteAdmin(id: string) {
        try {
            const admin = await this.adminModel.findByIdAndUpdate(id, { deleted: true });
            return { result: true, data: admin };
        } catch (error) {
            return { result: false, data: error };
        }
    }

    async updateAdmin(id: string, admin: updateAdminDto) {
        try {
            const updateAdmin = await this.adminModel.findByIdAndUpdate(id, admin, { new: true });
            return { result: true, data: updateAdmin };
        } catch (error) {
            return { result: false, data: error };
        }
    }
    async updateEmployee(id: string, admin: updateEmployeeDto) {
        try {
            const updateAdmin = await this.adminModel.findByIdAndUpdate(id, admin, { new: true });
            return { result: true, data: updateAdmin };
        } catch (error) {
            return { result: false, data: error };
        }
    }
}