import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { promises } from 'dns';
import { Model } from 'mongoose';
import { ShipperDto } from 'src/dto/dto.shipper';
import { Shipper } from 'src/schemas/shipper.schema';

import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/schemas/user.schemas';
import { Order } from 'src/schemas/order.schema';



@Injectable()
export class ShipperService {
    constructor(@InjectModel(Shipper.name) private shipperModel: Model<Shipper>,
        @InjectModel(User.name) private userModel: Model<Shipper>,
        @InjectModel(Order.name) private orderModel: Model<Order>) { }

    async createShipper(shipperDto: ShipperDto) {
        try {
            const phoneNumber = shipperDto.userID.phoneNumber;
            const password = shipperDto.userID.password;
            const balance = shipperDto.userID.balance;
            const email = shipperDto.userID.email;
            const role = shipperDto.userID.role;
            const hashPass = await bcrypt.hash(password, 10);

            const newUser = new this.userModel({ phoneNumber, password: hashPass, balance, email, role });
            if (!newUser) throw new HttpException("Create Fail", HttpStatus.NOT_FOUND);
            await newUser.save();

            const newShipper = new this.shipperModel({
                address: shipperDto.address,
                avatar: shipperDto.avatar,
                birthDay: shipperDto.birthDay,
                brandBike: shipperDto.brandBike,
                fullName: shipperDto.fullName,
                idBike: shipperDto.idBike,
                modeCode: shipperDto.modeCode,
                rating: shipperDto.rating,
                sex: shipperDto.sex,
                longitude: shipperDto.longitude,
                latitude: shipperDto.latitude,
                userID: newUser._id
            });
            if (!newShipper) throw new HttpException("Create Fail", HttpStatus.NOT_FOUND);
            await newShipper.save();

            return { result: true, createShipper: newShipper }

        } catch (error) {
            return { result: false, createShipper: error }
        }
    }


    async getAllShipper() {
        try {
            const shippers = await this.shipperModel.find().populate('userID');
            if (!shippers) return { Message: "Not found Order" }
            return { result: true, AllShipper: shippers }
        } catch (error) {
            return { result: false, AllShipper: error }
        }
    }

    async getHistory(id: string) {
        try {
            const orders = await this.orderModel.find({ "shipperID": id });
            if(!orders) throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
            return { result: true, historyShipper: orders }
        } catch (error) {
            return { result: false, historyShipper: error }
        }
    }

    async updateLocation(id: string, longitude: number, latitude: number) {
        try {
            const shipper = await this.shipperModel.findByIdAndUpdate(id,
                {longitude: longitude, latitude: latitude},
                {new: true});
            if(!shipper) throw new HttpException("Update fail location", HttpStatus.NOT_FOUND);
            await shipper.save();
            return { result: true, newLocation: shipper }
            
        } catch (error) {
            return { result: false, newLocation: error }
        }
    }
  
    async createShipper({ userID, ...shipperDto }: ShipperDto) {

        if (userID) {
            const newUsers = new this.users(userID)
            const savedUsers = await newUsers.save();
            const newUser = new this.shippers({
                ...shipperDto,
                userID: savedUsers._id,
            });
            return newUser.save();
        }

        const newShipper = new this.shippers(shipperDto)
        return newShipper.save();
    }
    getShipperById(id: string) {
        return this.shippers.findById(id);
    }

    getShipper() {
        return this.shippers.find().populate('userID');
    }

    // async getPhoneNumberShipper(id: string) {
    //     const getShipperById = await this.shippers.findById(id).populate('userID');
    //     if (getShipperById) {
    //         const getPhoneNumber = getShipperById.userID.phoneNumber;
    //         return { SDT: getPhoneNumber };
    //     } else {
    //         throw new Error("Lấy SDT thất bại")
    //     }
    // }


    async deleteShipper(id: string) {
        try {
            const ShipperById = await this.shippers.findById(id);
            
            // const UserID = ShipperById.userID;
            // console.log(UserID);
            const updateUserID = await this.shippers.findByIdAndUpdate(ShipperById, {deleted: true}, {new: true})
            if (updateUserID) {
                return "Xóa thành công Shipper"
            } else {
                throw new Error("Không tìm thấy ID Shipper")
            }
        } catch (error) {
            console.error('Error delete Shipper:', error);
            throw error;
        }
    }

    async updateShipper(id: string, updateShipper: ShipperDto) {
        try {
            const shipperNew = await this.shippers.findByIdAndUpdate(id, updateShipper, { new: true });
            return { shipperNew: shipperNew }
        } catch (error) {
            console.error('Error updating shipper:', error);
            throw error;
        }
    }
    async updateAvatar(id: string, avatar: string):Promise<User>{
        return await this.shippers.findByIdAndUpdate(id, {avatar});
    }
}
