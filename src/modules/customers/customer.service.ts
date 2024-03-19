import { Injectable } from "@nestjs/common/decorators/core"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CustomerDto } from "src/dto/dto.customer";
import { Customer } from "src/schemas/customer.schemas";
import { User } from "src/schemas/user.schemas";
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Order } from "src/schemas/order.schema";

@Injectable()
export class CustomerServices {
    constructor(@InjectModel(Customer.name) private customers: Model<Customer>,
        @InjectModel(User.name) private users: Model<User>,
        @InjectModel(Order.name) private orderModel: Model<Order>) { }

    async createUser(customerDto: CustomerDto) {
        try {
            const phoneNumber = customerDto.userID.phoneNumber;
            const password = customerDto.userID.password;
            const balance = customerDto.userID.balance;
            const email = customerDto.userID.email;
            const role = customerDto.userID.role;

            const hashPass = await bcrypt.hash(password, 10)

            const createUser = new this.users({ phoneNumber, password: hashPass, balance, email, role })
            await createUser.save();

            const createCustomer = new this.customers({
                userID: createUser._id,
                fullName: customerDto.fullName,
                avatar: customerDto.avatar,
                birthDay: customerDto.birthDay,
                joinDay: customerDto.joinDay,
                rating: customerDto.rating,
                sex: customerDto.sex,
            });
            if(!createCustomer) throw new HttpException("Create Fail", HttpStatus.NOT_FOUND)
            await createCustomer.save();

            return { result: true, customerNew: createCustomer}
        } catch (error) {
            return { result: false, customerNew: error}
        }
    }

    getCustomerById(id: string) {
        return this.customers.findById(id).populate('userID');
    }

    getCustmer() {
        return this.customers.find().populate('userID');
    }

    async getPhoneNumber(id: string) {
        const getCustomerById = await this.customers.findById(id).populate('userID');
        if (getCustomerById) {
            const getPhoneNumber = getCustomerById.userID.phoneNumber;
            return { SDT: getPhoneNumber };
        } else {
            return { SDT: "Lấy số điện thoại thất bại" };
        }
    }


    async deleteCustomer(id: string) {
        try {
            const customerById = await this.customers.findById(id);
            const userID = customerById.userID;
            const updateUserID = await this.users.findByIdAndUpdate(userID, { deleted: true }, { new: true })
            if (updateUserID) {
                return { Message: "Xóa thành công" }
            } else {
                return { Message: "Xóa thất bại" }
            }
        } catch (error) {
            console.error('Error delete customer:', error);
            throw error;
        }
    }

    async updateCustomer(id: string, updateCustomer: CustomerDto) {
        try {
            const customerNew = await this.customers.findByIdAndUpdate(id, updateCustomer, { new: true });
            if (!customerNew) throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
            return { result: true, customerUpdate: customerNew }
        } catch (error) {
            return { result: true, customerUpdate: error }
        }
    }


    async getHistoryById(id: string) {
        try {
            const orders = await this.orderModel.find({ customerID: id, status: 1 }).sort({ dataBook: 1 });
            if (!orders) throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
            return { result: true, history: orders }
        } catch (error) {
            return { result: false, history: error }
        }
    }
}

