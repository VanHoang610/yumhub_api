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
import { UserMerchant } from "src/schemas/userMerchant.schema";
import { Shipper } from "src/schemas/shipper.schema";


@Injectable()
export class CustomerServices {
    constructor(
        @InjectModel(Customer.name) private customers: Model<Customer>,
        @InjectModel(Order.name) private orderModel: Model<Order>,
        @InjectModel(UserMerchant.name) private userMerchantModel: Model<UserMerchant>,
        @InjectModel(Shipper.name) private shipperModel: Model<Shipper>,
        @InjectModel(ResetPassword.name) private resetPassModel: Model<ResetPassword>) { }


    async addData() {
        try {
            const createCustomer = await this.customers.create([
                {
                    _id: "6604de8e26f9a8b37aeb30d0",
                    phoneNumber: "135-556-3504",
                    fullName: "Ethelbert",
                    avatar: "http://dummyimage.com/234x100.png/dddddd/000000",
                    sex: "Male",
                    birthDay: "4/13/2023",
                    joinDay: "11/11/2023",
                    rating: 5,
                    email: "ekinkead0@dot.gov",
                    password: "$2a$04$CKrBK87496kZtqSoZTmkAexGgn4eEflO7I/DBXA4kzVqD94siZ77C"
                }, {
                    _id: "6604de8e26f9a8b37aeb30cf",
                    phoneNumber: "501-952-4222",
                    fullName: "Riannon",
                    avatar: "http://dummyimage.com/204x100.png/dddddd/000000",
                    sex: "Female",
                    birthDay: "10/16/2023",
                    joinDay: "5/23/2023",
                    rating: 4,
                    email: "rharsnipe1@newsvine.com",
                    password: "$2a$04$nQnP023cQumAdVeav00zwOX7AhV9CTBFWWn8XcMzbHT77.Jc2qUh2"
                }, {
                    _id: "6604de8e26f9a8b37aeb30ce",
                    phoneNumber: "257-987-1147",
                    fullName: "Kristien",
                    avatar: "http://dummyimage.com/138x100.png/dddddd/000000",
                    sex: "Female",
                    birthDay: "10/26/2023",
                    joinDay: "10/4/2023",
                    rating: 3,
                    email: "kscinelli2@multiply.com",
                    password: "$2a$04$zS2LEH1kKFIzGR7j.OGDh.A5rgoKVr83ONsEQjeTNI0k3nWNXv9kK"
                }, {
                    _id: "6604de8e26f9a8b37aeb30cd",
                    phoneNumber: "114-172-1663",
                    fullName: "Maurits",
                    avatar: "http://dummyimage.com/183x100.png/ff4444/ffffff",
                    sex: "Male",
                    birthDay: "3/3/2024",
                    joinDay: "9/14/2023",
                    rating: 4,
                    email: "mbattaille3@noaa.gov",
                    password: "$2a$04$4L/EY4ZV.fp4Hrjn3e4SSeioXKiFIWHVZDXm2HlI376PlC9krWdXu"
                }, {
                    _id: "6604de8e26f9a8b37aeb30cc",
                    phoneNumber: "158-131-3740",
                    fullName: "Revkah",
                    avatar: "http://dummyimage.com/230x100.png/cc0000/ffffff",
                    sex: "Female",
                    birthDay: "3/18/2024",
                    joinDay: "4/7/2023",
                    rating: 5,
                    email: "rarrault4@mysql.com",
                    password: "$2a$04$.3mWRrVVDV7L9jOwgLThvOu/fCoryfNxKakHkk5Oy4ldu9kv41S92"
                }
            ]);
            return { result: true, customerNew: createCustomer }
        } catch (error) {
            return { result: false, customerNew: error }
        }
    }

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
        } catch (error) {
            return { result: false, customer: error }
        }
    }


    async deleteCustomer(id: string) {
        try {
            const customerById = await this.customers.findByIdAndUpdate(id, { deleted: true }, { new: true });
            if (!customerById) throw new HttpException("Not Find ID Customer", HttpStatus.NOT_FOUND);
            return { result: true }
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


    async getHistoryById(id: string) {
        try {
            const orders = await this.orderModel.find({ customerID: id }).sort({ timeBook: 1 });
            if (!orders) throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
            return { result: true, history: orders }
        } catch (error) {
            return { result: false, history: error }
        }
    }

    async login(user: LoginDto) {
        try {
            let checkAccount = await this.customers.findOne({ phoneNumber: user.phoneNumber });
            if (!checkAccount) {
                checkAccount = await this.userMerchantModel.findOne({ phoneNumber: user.phoneNumber });
            }
            if (!checkAccount) {
                checkAccount = await this.shipperModel.findOne({ phoneNumber: user.phoneNumber });
            }
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

            const compare = await bcrypt.compare(passOld, existingUser.password);
            if (!compare) throw new HttpException("Password Fail", HttpStatus.NOT_FOUND);

            const hashPassNew = await bcrypt.hash(passNew, 10);

            existingUser.password = hashPassNew;
            await existingUser.save();
            return { result: true, data: existingUser }
        } catch (error) {
            console.error("Error in changePass:", error);
            return { result: false, data: error }
        }

    }

    async newCustomerInMonth(){
        try{
            const today = new Date()
            var amount=0
            var id=[]
            const firstDayOfMonth= new Date(today.getFullYear(), today.getMonth(), 1);
            const lasterDayOfMonth= new Date(today.getFullYear(), today.getMonth()+1, 0);
            const newCustomers = await this.customers.find({joinDay: { $gte: firstDayOfMonth, $lte: lasterDayOfMonth }})

            for( const customer of newCustomers){
                amount+=1
                id.push(customer._id)
            }
            return {result: true, amount: amount, ID: id}
        }catch(error){
            return {result: false, error: error}
        }
    }
}

