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

    async createUser({ userID, ...customerDto }: CustomerDto) {
        if (userID) {
            const passHash = await bcrypt.hash(userID.password, 10);

            const newUsers = new this.users({...userID, password: passHash});
            const savedUsers = await newUsers.save();
            const newCustomer = new this.customers({
                ...customerDto,
                userID: savedUsers._id,
            });
            return newCustomer.save();
        }

        const newCustomer = new this.customers(customerDto)
        return newCustomer.save();
    }

    getCustomerById(id: string) {
        return this.customers.findById(id);
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
            const updateUserID = await this.users.findByIdAndUpdate(userID, {deleted: true}, {new: true})
            if (updateUserID) {
                return { Message: "Xóa thành công"}
            } else {
                return { Message: "Xóa thất bại"}
            }
        } catch (error) {
            console.error('Error delete customer:', error);
            throw error;
        }
    }

    async updateCustomer(id: string, updateCustomer: CustomerDto) {
        try {
            const customerNew = await this.customers.findByIdAndUpdate(id, updateCustomer, { new: true });
            return { CustomerNew: customerNew }
        } catch (error) {
            console.error('Error updating customer:', error);
            throw error;
        }
    }


    async getHistoryById (id: string) {
        try {
            const orders = await this.orderModel.find({customerID: id, status: 1}).sort({dataBook: 1});
            if(!orders) throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
            return { result: true, history: orders }

        } catch (error) {
            return { result: false, history: error }
        }
    }

}

