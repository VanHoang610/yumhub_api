import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
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

}
