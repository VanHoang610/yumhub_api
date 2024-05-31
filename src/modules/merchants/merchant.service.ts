import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import { MerchantDto } from 'src/dto/dto.merchant';
import { Merchant } from 'src/schemas/merchant.schema';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Order } from 'src/schemas/order.schema';
import { Shipper } from 'src/schemas/shipper.schema';
import { RegisterMerchatDto } from 'src/dto/dto.registerMerchant';
import { UserMerchant } from 'src/schemas/userMerchant.schema';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/dto/dto.login';
import { ResetPassword } from 'src/schemas/resetPass.schema';
import { Mailer } from "src/helper/mailer";
import { RegisterEmployeeDto } from 'src/dto/dto.registerEmployee';
import { OrderStatus } from 'src/schemas/orderStatus.schema';
import { UpdateUserMerchantDto } from 'src/dto/dto.updateUserMerchant';
import { log } from 'console';
import { HistoryMerchantDto } from 'src/dto/dto.historyMerchant';
import { HistoryWalletMerchant } from 'src/schemas/historyWalletMerchant.schema';
import { TransactionTypeMerchant } from 'src/schemas/transactionTypeMerchant.schema';
// import { ObjectId } from 'mongoose';
import { type } from 'os';
import { Food } from 'src/schemas/food.schema';
import { JwtService } from '@nestjs/jwt';
import { Review } from 'src/schemas/review.schema';
import { DocumentMerchant } from 'src/schemas/documentMerchant.schema';
import { PaymentMethodMerchant } from 'src/schemas/paymentMethodMerchant.schema';
import { TypeOfMerchant } from 'src/schemas/typeOfMerchant.schema';
import { Customer } from 'src/schemas/customer.schemas';
import { Address } from 'src/schemas/address.schema';
const { ObjectId } = require('mongodb');


@Injectable()
export class MerchantService {

    constructor(
        private jwtService: JwtService,
        @InjectModel(Food.name) private foodModel: Model<Food>,
        @InjectModel(Merchant.name) private merchants: Model<Merchant>,
        @InjectModel(Customer.name) private customerModol: Model<Customer>,
        @InjectModel(Address.name) private addressModol: Model<Address>,
        @InjectModel(UserMerchant.name) private userMerchantModel: Model<UserMerchant>,
        @InjectModel(ResetPassword.name) private resetPasswordModel: Model<ResetPassword>,
        @InjectModel(Order.name) private orderModel: Model<Order>,
        @InjectModel(Shipper.name) private shipperModel: Model<Shipper>,
        @InjectModel(OrderStatus.name) private statusModel: Model<OrderStatus>,
        @InjectModel(HistoryWalletMerchant.name) private historyMerchantModel: Model<HistoryWalletMerchant>,
        @InjectModel(TransactionTypeMerchant.name) private typeMerchantModel: Model<TransactionTypeMerchant>,
        @InjectModel(TypeOfMerchant.name) private typeOfMerchantModel: Model<TypeOfMerchant>,
        @InjectModel(DocumentMerchant.name) private documentMerchantModel: Model<DocumentMerchant>,
        @InjectModel(PaymentMethodMerchant.name) private paymentMethodMerchantModel: Model<PaymentMethodMerchant>,
        @InjectModel(Review.name) private reviewModel: Model<Review>,) { }

    async addData() {
        try {
            const newMerchants = await this.merchants.create([
                {
                    _id: "660c99c2fc13ae788b50fbdc",
                    name: "Neutrogena Men Age Fighter Face",
                    type: "6604e35881084710d45efe8c",
                    openTime: "6:40 AM",
                    closeTime: "4:43 PM",
                    rating: "4780644259",
                    address: "3 Mesta Parkway",
                    businessLicense: 4,
                    deleted: false,
                    longitude: -79.2056361,
                    latitude: 43.1508732,
                    status: 1,
                    joinDay: "11/23/2023",
                    balance: 50000,
                }, {
                    _id: "660c99c2fc13ae788b50fbe0",
                    name: "Acyclovir",
                    type: "6604e35881084710d45efe8c",
                    openTime: "10:00 AM",
                    closeTime: "8:11 PM",
                    rating: "5999573513",
                    address: "00 Algoma Trail",
                    businessLicense: 2,
                    deleted: false,
                    longitude: -78.69957,
                    latitude: 46.31681,
                    status: 1,
                    joinDay: "11/23/2023",
                    balance: 50000,
                }, {
                    _id: "660c99c2fc13ae788b50fbdf",
                    name: "Grippe",
                    type: "6604e35881084710d45efe8d",
                    openTime: "1:05 PM",
                    closeTime: "4:05 PM",
                    rating: "0797479198",
                    address: "57084 Onsgard Junction",
                    businessLicense: 2,
                    deleted: false,
                    longitude: 97.8503951,
                    latitude: 2.6928351,
                    status: 1,
                    joinDay: "11/23/2023",
                    balance: 50000,
                }, {
                    _id: "660c99c2fc13ae788b50fbde",
                    name: "ibuprofen",
                    type: "6604e35881084710d45efe8f",
                    openTime: "12:23 AM",
                    closeTime: "9:06 PM",
                    rating: "2935049756",
                    address: "586 Roth Street",
                    businessLicense: 4,
                    deleted: true,
                    longitude: 17.5275042,
                    latitude: 43.9760578,
                    status: 1,
                    joinDay: "11/23/2023",
                    balance: 50000,
                }, {
                    _id: "660c99c2fc13ae788b50fbdd",
                    name: "TRAMADOL HYDROCHLORIDE",
                    type: "6604e35881084710d45efe8e",
                    openTime: "9:23 AM",
                    closeTime: "4:25 PM",
                    rating: "1965644376",
                    address: "863 Summerview Way",
                    businessLicense: 3,
                    deleted: false,
                    longitude: 113.116527,
                    latitude: 26.12715,
                    status: 1,
                    joinDay: "11/23/2023",
                    balance: 50000,
                }]);
            return { result: true, newMerchant: newMerchants }
        } catch (error) {
            return { result: false, newMerchant: error }
        }
    }


    async createMerchant(merchant: RegisterMerchatDto) {
        try {
            const newMerchant = new this.merchants({
                name: merchant.name,
                address: merchant.address,
                closeTime: merchant.closeTime,
                openTime: merchant.openTime,
                type: merchant.type,
                imageBackground: merchant.imageBackground,
                status: 1,
                creatAt: Date.now()
            });
            if (!newMerchant) throw new HttpException("Register Failed", HttpStatus.NOT_FOUND)
            await newMerchant.save();
            const idMerchant = await newMerchant._id;
            const newUserMerchant = new this.userMerchantModel({
                merchantID: idMerchant,
                phoneNumber: merchant.phoneNumber,
                fullName: merchant.fullName,
                sex: merchant.sex,
                avatar: merchant.avatar,
                email: merchant.email,
            });
            if (!newUserMerchant) throw new HttpException("Register Failed", HttpStatus.NOT_FOUND)
            await newUserMerchant.save();
            return { result: true, newMerchant: newMerchant, newUserMerchant: newUserMerchant }

        } catch (error) {
            console.log(error);
            return { result: false, newMerchant: error }

        }
    }

    // getMerchantById(id: string) {
    //     return this.merchants.findById(id);
    // }

    async getMerchant() {
        try {
            const merchants = await this.merchants.find({deleted: false});
            await this.merchants.populate(merchants, { path: 'type' });
            if(!merchants) throw new HttpException('Not found merchant', HttpStatus.UNAUTHORIZED);
            return { result: true, merchants: merchants }
        } catch (error) {
              return { result: true, merchants: error }
        }
    }

    async deleteMerchant(id: string) {
        try {
            const merchantById = await this.merchants.findById(id);
            const updateMerchantID = await this.merchants.findByIdAndUpdate(merchantById, { deleted: true }, { new: true })
            if (updateMerchantID) {
                return "Xóa thành công Merchant"
            } else {
                throw new Error("Không tìm thấy ID merchant")
            }
        } catch (error) {
            console.error('Error delete merchant:', error);
            throw error;
        }
    }

    async updateMerchant(id: string, updateMerchant: MerchantDto) {
        try {
            const merchantNew = await this.merchants.findByIdAndUpdate(id, updateMerchant, { new: true });

            const userMerchant = await this.userMerchantModel.findOne({merchantID: id});
            const idUserMerchant = userMerchant._id;
            const userMerchantUpdate = {
                email: updateMerchant.email,
                phoneNumber: updateMerchant.phoneNumber,
                fullName: updateMerchant.fullName,
              };
              
              const userMerchantNew = await this.userMerchantModel.findByIdAndUpdate(idUserMerchant, userMerchantUpdate, { new: true });
            return { result: true, merchantNew: merchantNew, userMerchantNew }
        } catch (error) {
            console.error('Error updating merchant:', error);
            throw error;
        }
    }

    async getHistory(id: string) {
        try {

            const orders = await this.orderModel.find({ merchantID: id }).sort({ timeBook: 1 }).populate('customerID');
            if (!orders) throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
            return { result: true, history: orders }

        } catch (error) {
            return { result: false, historyShipper: error }
        }
    }

    async sortLocation(longitude: number, latitude: number) {
        try {
            const now = new Date();
            const merchants = await this.merchants.find({}).exec();
            const sortedMerchants = merchants.map(merchant => {
                const openTimeParts = merchant.openTime.split(":");
                const closeTimeParts = merchant.closeTime.split(":");

                const openHour = parseInt(openTimeParts[0]);
                const openMinute = parseInt(openTimeParts[1].split(" ")[0]);
                const openAMPM = openTimeParts[1].split(" ")[1];
                const openTime = new Date();
                openTime.setHours(openAMPM === "PM" ? openHour + 12 : openHour);
                openTime.setMinutes(openMinute);

                const closeHour = parseInt(closeTimeParts[0]);
                const closeMinute = parseInt(closeTimeParts[1].split(" ")[0]);
                const closeAMPM = closeTimeParts[1].split(" ")[1];
                const closeTime = new Date();
                closeTime.setHours(closeAMPM === "PM" ? closeHour + 12 : closeHour);
                closeTime.setMinutes(closeMinute);

                // console.log(now.getHours() + "Giờ hiện tại" + openTime.getHours() + "Giờ mở cửa" + closeTime.getHours() + "Giờ đóng cửa");

                if (
                    (now.getHours() > openTime.getHours() ||
                        (now.getHours() === openTime.getHours() && now.getMinutes() >= openTime.getMinutes())) &&
                    (now.getHours() < closeTime.getHours() ||
                        (now.getHours() === closeTime.getHours() && now.getMinutes() <= closeTime.getMinutes()))
                ) {
                    const distance = Math.sqrt(Math.pow(merchant.longitude - longitude, 2) + Math.pow(merchant.latitude - latitude, 2));
                    return { ...merchant.toObject(), distance };
                } else {
                    return null;
                }
            }).filter(merchant => merchant !== null); // Lọc bỏ các cửa hàng có giá trị null

            // Sắp xếp các cửa hàng theo khoảng cách
            sortedMerchants.sort((a, b) => a.distance - b.distance);
            return { result: true, merchants: sortedMerchants };
        } catch (error) {
            return { result: false, merchants: error };
        }
    }


    async get5NearestShippers(id: string) {
        try {
            const merchant = await this.merchants.findById(id).exec();
            const shipper = await this.shipperModel.find({ status: 3 }).exec();

            //tính quãng đường
            const sortShipper = shipper.map(shipper => {
                const distance = Math.sqrt(Math.pow(shipper.longitude - merchant.longitude, 2) + Math.pow(shipper.latitude - merchant.latitude, 2));
                return { ...shipper.toObject(), distance };
            });

            sortShipper.sort((a, b) => a.distance - b.distance);
            const nearestShippers = sortShipper.slice(0, 5);
            return { result: true, get5NearestShippers: nearestShippers }

        } catch (error) {
            return { result: false, get5NearestShippers: error }
        }
    }

    async login(user: LoginDto) {
        try {
            const checkAccount = await this.userMerchantModel.findOne({ phoneNumber: user.phoneNumber });
            if (!checkAccount) throw new HttpException("Không đúng SDT", HttpStatus.NOT_FOUND);
            const checkStatus = await this.merchants.findOne({ _id: checkAccount.merchantID, status: 2 });
            if (!checkStatus) throw new HttpException("Tài khoản chưa đăng ký", HttpStatus.NOT_FOUND);
            const compare = await bcrypt.compare(user.password, checkAccount.password);
            if (!compare) throw new HttpException("Không đúng mật khẩu", HttpStatus.NOT_FOUND);

            // Tạo token
            const payload = {
                phoneNumber: checkAccount.phoneNumber,
                sex: checkAccount.sex,
                email: checkAccount.email,
                fullName: checkAccount.fullName,
                avatar: checkAccount.avatar,
                merchantID: checkAccount.merchantID,
                role: checkAccount.role,
            };
            const token = await this.jwtService.signAsync(payload);
            checkAccount.password = undefined;
            return { result: true, data: { checkAccount, token } }
        } catch (error) {
            return { result: false, data: error }
        }
    }

    async forgetPassByEmail(email: string) {
        try {
            const user = await this.userMerchantModel.findOne({ email: email });
            if (!user) throw new HttpException("Email chưa đăng ký", HttpStatus.NOT_FOUND);

            const otp = Math.floor(1000 + Math.random() * 9000);

            const passwordRest = new this.resetPasswordModel({ email: email, otp: otp })
            await passwordRest.save();

            await Mailer.sendMail({
                email: user.email,
                subject: "Khôi phục mật khẩu",
                content: `Mã OTP của bạn là: ${otp}`
            });

            setTimeout(async () => {
                await this.resetPasswordModel.deleteOne({ email: email });
            }, 120000);

            return { result: true, message: "Hãy kiểm tra email của bạn!" }

        } catch (error) {
            return { result: false, message: "Gửi OTP thất bại" }
        }
    }

    async checkOTP(email: string, otp: string) {
        try {
            const user = await this.resetPasswordModel.findOne({ email: email, otp: otp });
            if (!user) throw new HttpException('Not Find', HttpStatus.NOT_FOUND);
            await this.resetPasswordModel.deleteOne({ email: email });
            return { result: true, message: "Xác nhận OTP thành công" }
        } catch (error) {
            return { result: false, message: "OTP thất bại" }
        }
    }

    async resetPass(id: string, password: string) {
        try {
            const user = await this.userMerchantModel.findById(id);
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
            const existingUser = await this.userMerchantModel.findById(id);
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

    async verifileMerchant(email: string) {
        try {
            const user = await this.userMerchantModel.findOne({ email: email });
            if (!user) throw new HttpException("Email chưa đăng ký", HttpStatus.NOT_FOUND);
            const password = (Math.floor(100000 + Math.random() * 900000)).toString();
            const hashPassword = await bcrypt.hash(password, 10);
            user.password = hashPassword;
            await user.save();
            console.log(user.password);

            const merchant = await this.merchants.findOne({ _id: user.merchantID });
            if (!merchant) throw new HttpException("Merchant không tồn tại", HttpStatus.NOT_FOUND);
            merchant.status = 2;
            await merchant.save();

            await Mailer.sendMail({
                email: user.email,
                subject: "Chúc mừng bạn đã trở thành đối tác của YumHub",
                content: `Email của bạn là: ${email}
                            Password của bạn là: ${password}`
            });

            return { result: true, message: "Hãy kiểm tra email của bạn!" }
        } catch (error) {
            console.log(error);

            return { result: false, message: "Gửi thất bại" }
        }
    }

    async createEmployee(register: RegisterEmployeeDto) {
        try {
            const hashPassword = await bcrypt.hash(register.password, 10);
            const newEmployee = new this.userMerchantModel({
                ...register,
                role: 2,
                password: hashPassword
            });
            if (!newEmployee) throw new HttpException("Register Fail", HttpStatus.NOT_FOUND);
            await newEmployee.save();
            return { result: true, newEmployee: newEmployee }
        } catch (error) {
            console.log(error);
            return { result: false, newEmployee: error }
        }
    }

    async revenueMerchantTimeTwoTime(id: string, dateStart: string, dateEnd: string) {
        try {
            
            const start = new Date(dateStart).setHours(0, 0, 0, 0);;
            const end = new Date(dateEnd).setHours(23, 59, 59, 999);;
            const DeliveredID = await this.statusModel.findOne({ name: "delivered" });
            const CancelID = await this.statusModel.findOne({ name: "cancel" });

            var totalRevenue = 0;
            var payByBanking = 0;
            var payByZalo = 0;
            var payByCash =  0;
            const merchant = await this.merchants.findById(id);
            if (!merchant){
                return {result:"nhập sai ID Merchant", revenue:0,  cancel:0}
            }

            // Lấy tất cả các hóa đơn của merchant thành công trong khoảng thời gian đã cho
            const orders = await this.orderModel.find({
                merchantID: Object(id), // Chuyển đổi ID thành ObjectId ở đây
                timeBook: { $gte: dateStart, $lte: dateEnd },
                status: DeliveredID?._id // Sử dụng DeliveredID?._id để tránh lỗi nếu không tìm thấy
            })
            // Lấy tất cả các hóa đơn của merchant huỷ trong khoảng thời gian đã cho
            const orderCancel = await this.orderModel.find({
                merchantID: Object(id), // Chuyển đổi ID thành ObjectId ở đây
                timeBook: { $gte: start, $lte: end },
                status: CancelID?._id // Sử dụng CancelID?._id để tránh lỗi nếu không tìm thấy
            })
            var numberOfOrders=0;
            for (const order of orders) {
                numberOfOrders+=1
                totalRevenue += order.revenueMerchant; // Giả sử totalAmount là trường lưu số tiền của hóa đơn
                if (order.paymentMethod == 1) {
                    payByBanking += order.revenueMerchant;
                }else if (order.paymentMethod == 2) {
                    payByZalo += order.revenueMerchant;
                }else if (order.paymentMethod == 3) {
                    payByCash += order.revenueMerchant;
                }
            }
            var numberOfOrderCancel =0
            for (const order of orderCancel) {
                numberOfOrderCancel+=1
            }

            return { result: true, revenue: totalRevenue, success: numberOfOrders ,cancel: numberOfOrderCancel, payByBanking: payByBanking, payByZalo: payByZalo, payByCash: payByCash }
        } catch (error) {
            return { result: false, revenue: error, cancel:error }
        }

    }
    async getRevenueWeek(ID: string) {
        try {
            const currentDate = new Date();
            var currentDay = currentDate.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
            if (currentDay==0){
                currentDay=7
            }
            const startOfWeek = new Date(currentDate);
            startOfWeek.setHours(0, 0, 0, 0); // Set to 00:00:00.000
            startOfWeek.setDate(startOfWeek.getDate() - currentDay + 1); // Set to Monday of current week
            const startDate = startOfWeek.toString()
            const endOfWeek = new Date(currentDate);
            endOfWeek.setHours(23, 59, 59, 999); // Set to 23:59:59.999
            endOfWeek.setDate(endOfWeek.getDate() - currentDay + 7); // Set to Sunday of current week
            const endDate = endOfWeek.toString()
            const result = this.revenueMerchantTimeTwoTime(ID, startDate, endDate);
            return { result: true, revenue: (await result).revenue, success:(await result).success, cancel:(await result).cancel}
        } catch (error) {
            return { result: false, revenue: error }
        }
    }
    async getRevenueMonth(ID: string, month: string) {
        try {
            
            const [targetYear, targetMonth] = month.split('-').map(part => parseInt(part, 10));
            const firstDateMonth = new Date(targetYear, targetMonth - 1, 1)

            const startDate = firstDateMonth.toString()
            const firstDateNextMonth = new Date(targetYear, targetMonth, 1)
            const lastDateOfMonth = new Date(firstDateNextMonth.getTime() - 1)
            const endDate = lastDateOfMonth.toString()
            const result = this.revenueMerchantTimeTwoTime(ID, startDate, endDate);
            return { result: true, revenue: (await result).revenue, success:(await result).success, cancel:(await result).cancel }
        } catch (error) {
            return { result: false, revenue: error }
        }
    }


    async updateUserMerchant(id: string, update: UpdateUserMerchantDto) {
        try {
            const updated = await this.userMerchantModel.findByIdAndUpdate(id, update, { new: true });
            if (!updated) throw new HttpException("Update UserMerchant Fail", HttpStatus.NOT_FOUND);
            return { result: true, data: updated }
        } catch (error) {
            return { result: false, error }
        }
    }

    async deleteUserMerchant(id: string) {
        try {
            const updated = await this.userMerchantModel.findByIdAndUpdate(id, { deleted: true }, { new: true });
            if (!updated) throw new HttpException("Update UserMerchant Fail", HttpStatus.NOT_FOUND);
            return { result: true, message: "Delete Success" }
        } catch (error) {
            return { result: false, error }
        }
    }

    async listMerchantApproval() {
        try {
            const listMerchant = await this.merchants.find({ status: 1 });
            await this.merchants.populate(listMerchant, { path: 'type' });
            return { result: true, listMerchantApproval: listMerchant }
        } catch (error) {
            console.log(error);
            return { result: false, error }
        }
    }


    async getMerchantById(id: string) {
        try {
            const detailMerchant = await this.merchants.findById(id);
            if (!detailMerchant) throw new HttpException("Not Found Merchant", HttpStatus.NOT_FOUND);
            const user = await this.userMerchantModel.findOne({ merchantID: id });
            const document = await this.documentMerchantModel.findOne({ merchantID: id });
            const paymentMethod = await this.paymentMethodMerchantModel.findOne({ merchantID: id });

            await this.merchants.populate(detailMerchant, { path: 'type' });
            const mergedDetailMerchant = {
                ...detailMerchant.toJSON(), 
                document: document,
                paymentMethod: paymentMethod,
                user: user
            };
           
    
            return { result: true, detailMerchant: mergedDetailMerchant };
        } catch (error) {
            return { result: false, error };
        }
    }

    async topUpMerchant(id: string, topUp: HistoryMerchantDto) {
        try {
            const merchant = await this.merchants.findById(id);
            const idMerchant = merchant._id;

            const typeMerchant = await this.typeMerchantModel.findOne({ name: "topUp" }).exec();
    
            const currentBalance = merchant.balance;
            const updateBalance = currentBalance + topUp.amountTransantion;
            merchant.balance = updateBalance;
            await merchant.save();
            const createHistory = await this.historyMerchantModel.create(
                {
                    "merchantID": idMerchant,
                    "amountTransantion": topUp.amountTransantion,
                    "description": topUp.description,
                    "transantionType": typeMerchant._id,
                    "time": new Date()
                }
            )
    
            return { result: true, WalletMerchant: createHistory };
        } catch (error) {
            return { result: false, error };
        }
    }


    async cashOutMerchant(id: string, topUp: HistoryMerchantDto) {
        try {
            const merchant = await this.merchants.findById(id);
            const idMerchant = merchant._id;

            const typeMerchant = await this.typeMerchantModel.findOne({ name: "cashOut" }).exec();
    
            const currentBalance = merchant.balance;
            const updateBalance = currentBalance - topUp.amountTransantion;
            merchant.balance = updateBalance;
            await merchant.save();
            const createHistory = await this.historyMerchantModel.create(
                {
                    "merchantID": idMerchant,
                    "amountTransantion": topUp.amountTransantion,
                    "description": topUp.description,
                    "transantionType": typeMerchant._id,    
                    "time": new Date()
                }
            )
            return { result: true, WalletMerchant: createHistory };
        } catch (error) {
            return { result: false, error };
        }
    }

    async transactionHistory(id: string) {
        try {
            const merchant = await this.merchants.findById(id);
            const idMerchant = merchant._id;
            const history = await this.historyMerchantModel.find({ merchantID: idMerchant }).exec();
            return { result: true, TransactionHistory: history };
        } catch (error) {
            return { result: false, error };
        }
    }
    

    async newMerchantInMonth(){
        try{
            const today = new Date()
            var amount=0
            var id=[]
            const firstDayOfMonth= new Date(today.getFullYear(), today.getMonth(), 1);
            const lasterDayOfMonth= new Date(today.getFullYear(), today.getMonth()+1, 0);
            const newMerchants = await this.merchants.find({joinDay: { $gte: firstDayOfMonth, $lte: lasterDayOfMonth }})

            for( const merchant of newMerchants){
                amount+=1
                id.push(merchant._id)
            }
            return {result: true, amount: amount, ID: id}
        }catch(error){
            return {result: false, error: error}
        }
    }
    async searchMerchant(any: string){
        
        return this.merchants.find({ name: { $regex: any, $options: 'i' } }).exec();
    }

    async getFoodByMerchant(id: string) {
        try {
            const merchant = await this.merchants.findById(id);
            if (!merchant) throw new HttpException('Not Find Merchant', HttpStatus.NOT_FOUND);
            const idMerchant = merchant._id;
            const allFood = await this.foodModel.find({ merchantID: idMerchant, status: "661fb317ee3a326f69b55386" });
            if (!allFood) throw new HttpException('Not Find Food', HttpStatus.NOT_FOUND);

            return { result: true, allFood: allFood }
        } catch (error) {
            return { result: false, allFood: error }
        }
    }
    async getRating(id : string){
        const orders = await this.orderModel.find({merchantID:id}).exec()
        if (!orders){
            return {result: true, rating:0}
        }
        const typeOfReviewObjectId = new ObjectId("6604e5a181084710d45efe9c");// customer review merchant
        var numberOfReview =0
        var totalPointReview =0
        for (const order of orders){
            const reviews = await this.reviewModel.find({orderID:order._id, typeOfReview:typeOfReviewObjectId})
            for (const review of reviews){
                totalPointReview+=review.rating
                numberOfReview+=1
            }
        }
        const rating = numberOfReview>0? totalPointReview/numberOfReview: 0
        return {result: true, rating:rating}
    }

    async getAllTypeOfMerchant() {
        try {
            const types = await this.typeOfMerchantModel.find().exec();
            if(!types) throw new HttpException("Not Found TypeMerchant", HttpStatus.NOT_FOUND)
            return {result: true, types: types}
        } catch (error) {
            return {result: false, types: error}
        }
    }

    async getNearMerchant(id: string) {
        try {
            const addressCustomer = await this.addressModol.findOne({customerID: id});
            if(!addressCustomer) throw new HttpException("Not Found Address", HttpStatus.NOT_FOUND)
            const merchants = await this.merchants.find({status: 3}).exec();
            if(!merchants) throw new HttpException("Not Found Merchants", HttpStatus.NOT_FOUND)


             //tính quãng đường
             const sortMerchant = merchants.map(merchant => {
                const distance = Math.sqrt(Math.pow(merchant.longitude - addressCustomer.longitude, 2) + Math.pow(merchant.latitude - addressCustomer.latitude, 2));
                return { ...merchant.toObject(), distance };
            });
            
            sortMerchant.sort((a, b) => a.distance - b.distance);
            // const nearestCustomer = sortMerchant.slice(0, 5);
            return { result: true, nearestCustomer: sortMerchant }
        } catch (error) {
            return { result: false, nearestCustomer: error }
        }
    }
   
}

