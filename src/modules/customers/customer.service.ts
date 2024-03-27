import { Injectable } from "@nestjs/common/decorators/core"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CustomerDto } from "src/dto/dto.customer";
import { Customer } from "src/schemas/customer.schemas";
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Order } from "src/schemas/order.schema";
import { RegisterCustomerDto } from "src/dto/dto.registerCustomer";
import { UpdateCustomerDto } from "src/dto/dto.updateCustomer";
import { LoginDto } from "src/dto/dto.login";
import { ResetPassword } from "src/schemas/resetPass.schema";
import { Mailer } from "src/helper/mailer";

@Injectable()
export class CustomerServices {
    constructor(@InjectModel(Customer.name) private customers: Model<Customer>,
        @InjectModel(Order.name) private orderModel: Model<Order>,
        @InjectModel(ResetPassword.name) private resetPassModel: Model<ResetPassword>) { }

    async createUser(customer: RegisterCustomerDto) {
        try {
            const checkPhone = await this.customers.findOne({ phoneNumber: customer.phoneNumber });
            if (checkPhone) throw new HttpException("SDT đã được đăng ký", HttpStatus.NOT_FOUND);
            const checkEmail = await this.customers.findOne({ email: customer.email });
            if (checkEmail) throw new HttpException("Email đã được đăng ký", HttpStatus.NOT_FOUND);
            const phoneNumber = customer.phoneNumber
            const password = customer.password
            const email = customer.email
            const hashPass = await bcrypt.hash(password, 10)

            const createCustomer = new this.customers({
                phoneNumber: phoneNumber,
                password: hashPass,
                email: email,
            });
            if (!createCustomer) throw new HttpException("Register Failed", HttpStatus.NOT_FOUND)
            await createCustomer.save();
            return { result: true, customerNew: createCustomer }
        } catch (error) {
            return { result: false, customerNew: error }
        }
    }

    async getCustomerById(id: string) {
        try {
            const customer = await this.customers.findById(id);
            if (!customer) throw new HttpException("Not Find ID Customer", HttpStatus.NOT_FOUND)
            return { result: true, customer: customer }
        } catch (error) {
            return { result: false, customer: error }
        }
    }

    async getCustmer() {
        try {
            const customer = await this.customers.find();
            if (!customer) throw new HttpException("Not Find Customer", HttpStatus.NOT_FOUND)
            return { result: true, customer: customer }
        } catch (error) {
            return { result: false, customer: error }
        }
    }

    async getPhoneNumber(id: string) {
        try {
            const getCustomerById = await this.customers.findById(id);
            if (!getCustomerById) throw new HttpException("Not Find ID Customer", HttpStatus.NOT_FOUND);
            const phoneNumber = getCustomerById.phoneNumber;
            return { result: true, phoneNumber: phoneNumber }
        }catch (error) {
            return { result: false, customer: error }
        }
    }


    async deleteCustomer(id: string) {
        try {
            const customerById = await this.customers.findByIdAndUpdate(id, { deleted: true }, { new: true });
            if (!customerById) throw new HttpException("Not Find ID Customer", HttpStatus.NOT_FOUND);
            return { result: true}
        } catch (error) {
            return { result: false, customerUpdate: error }
        }
    }

    async updateCustomer(id: string, updateCustomer: UpdateCustomerDto) {
        try {   
            const customerNew = await this.customers.findByIdAndUpdate(id, updateCustomer, { new: true });
            if (!customerNew) throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
            return { result: true, customerUpdate: customerNew }
        } catch (error) {
            return { result: false, customerUpdate: error }
        }
    }


    // async getHistoryById(id: string) {
    //     try {
    //         const orders = await this.orderModel.find({ customerID: id, status: 1 }).sort({ dataBook: 1 });
    //         if (!orders) throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
    //         return { result: true, history: orders }
    //     } catch (error) {
    //         return { result: false, history: error }
    //     }
    // }

    async login(user: LoginDto) {
        try {
            const checkAccount = await this.customers.findOne({ phoneNumber: user.phoneNumber });
            if (!checkAccount) throw new HttpException("Không đúng SDT", HttpStatus.NOT_FOUND);
            const compare = await bcrypt.compare(user.password, checkAccount.password);
            if (!compare) throw new HttpException("Không đúng mật khẩu", HttpStatus.NOT_FOUND);

            return { result: true, data: checkAccount }
        } catch (error) {
            return { result: false, data: error }
        }
    }


    async forgetPassByEmail(email: string) {
        try {
            const user = await this.customers.findOne({ email: email });
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
            if (!user) throw new HttpException('Not Find', HttpStatus.NOT_FOUND);
            await this.resetPassModel.deleteOne({ email: email });
            return { result: true, message: "Xác nhận OTP thành công" }
        } catch (error) {
            return { result: false, message: "OTP thất bại" }
        }
    }

    async resetPass(id: string, password: string) {
        try {
            const user = await this.customers.findById(id);
            if (!user) throw new HttpException("Not Find Account", HttpStatus.NOT_FOUND);
            const passwordNew = await bcrypt.hash(password, 10);

            user.password = passwordNew
            user.save();
            return { result: true, data: user }
        } catch (error) {
            return { result: false, data: error }
        }
    }

    async changePass(id: string, passOld: string, passNew: string) {
        try {
            const existingUser = await this.customers.findById(id);
            if (!existingUser) throw new HttpException("Not Find Account", HttpStatus.NOT_FOUND);

            if (typeof passNew !== 'string') {
                throw new Error("passNew must be a string");
            }
            const compare = await bcrypt.compare(passOld, existingUser.password);
            if (!compare) throw new HttpException("Password Fail", HttpStatus.NOT_FOUND);
          
            const hashPassNew = await bcrypt.hash(passNew, 10);

            existingUser.password = hashPassNew;
            await existingUser.save();
            return { result: true, data: existingUser}
        } catch (error) {
            console.error("Error in changePass:", error);
            return { result: false, data: error }
        }
    }
}

