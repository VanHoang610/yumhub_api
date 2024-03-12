import { Injectable } from "@nestjs/common/decorators/core"
import { InjectModel } from "@nestjs/mongoose";
import { get } from "http";
import { Model } from "mongoose";
import { CustomerDto } from "src/dto/dto.customer";
import { Customer } from "src/schemas/customer.schemas";
import { User } from "src/schemas/user.schemas";

@Injectable()
export class CustomerServices {
    constructor(@InjectModel(Customer.name) private customers: Model<Customer>,
        @InjectModel(User.name) private users: Model<User>) { }

    async createUser({ userID, ...customerDto }: CustomerDto) {

        if (userID) {
            const newUsers = new this.users(userID)
            const savedUsers = await newUsers.save();
            const newUser = new this.customers({
                ...customerDto,
                userID: savedUsers._id,
            });
            return newUser.save();
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
            throw new Error("Lấy SDT thất bại")
        }
    }


    async deleteCustomer(id: string) {
        try {
            const customerById = await this.customers.findById(id);
            const userID = customerById.userID;
            const updateUserID = await this.users.findByIdAndUpdate(userID, {deleted: true}, {new: true})
            if (updateUserID) {
                return "Xóa thành công Customer"
            } else {
                throw new Error("Không tìm thấy ID Customer")
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

}

