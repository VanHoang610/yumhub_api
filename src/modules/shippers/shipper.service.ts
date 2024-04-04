import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { promises } from 'dns';
import { Model } from 'mongoose';
import { ShipperDto } from 'src/dto/dto.shipper';
import { Shipper } from 'src/schemas/shipper.schema';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Order } from 'src/schemas/order.schema';



@Injectable()
export class ShipperService {
    constructor(@InjectModel(Shipper.name) private shipperModel: Model<Shipper>,
        @InjectModel(Order.name) private orderModel: Model<Order>) { }

    async addData() {
        try {
            const shippers = await this.shipperModel.create([
                {
                    _id: "6604e1ec5a6c5ad8711aebf9",
                    phoneNumber: "0776616818",
                    fullName: "Lilllie",
                    avatar: "http://dummyimage.com/143x100.png/cc0000/ffffff",
                    sex: "Female",
                    birthDay: "6/25/2023",
                    address: "61 Schurz Point",
                    rating: 4,
                    email: "lkillingsworth0@webmd.com",
                    password: "$2a$04$Dsy.uYNPE9BwplGCe7jHVO26VyZmgBNfwiQuFmlxYdJ0UMxGFZOou",
                    brandBike: "0527-1537",
                    modeCode: "Purple",
                    idBike: "$2a$04$qUdzkcwnmTJRu/yf7ctpwuRbBDebzPQDUFtAIQ0JyuT2XgTdQzRpu",
                    active: false,
                    longitude: 112.5766579,
                    latitude: -6.9852949
                }, {
                    _id: "6604e1ec5a6c5ad8711aebfa",
                    phoneNumber: "07766168182",
                    fullName: "Greg",
                    avatar: "http://dummyimage.com/144x100.png/ff4444/ffffff",
                    sex: "Male",
                    birthDay: "5/13/2023",
                    address: "98 Namekagon Hill",
                    rating: 5,
                    email: "giorns1@buzzfeed.com",
                    password: "$2a$04$UafAK9VpiE/nDrz5DRsdRuXtJXmi5vetagD.VWIgb3zuc7vbFt6vy",
                    brandBike: "36987-2308",
                    modeCode: "Yellow",
                    idBike: "$2a$04$Y9WIWV2Du0NeGtxM/zJ1ZOar/UWF7xgVuGMDZMh/GeyzAZyaplZ2a",
                    active: false,
                    longitude: 95.8601611,
                    latitude: 20.8765931
                }, {
                    _id: "6604e1ec5a6c5ad8711aebfb",
                    phoneNumber: "0776216818",
                    fullName: "Wright",
                    avatar: "http://dummyimage.com/198x100.png/dddddd/000000",
                    sex: "Male",
                    birthDay: "1/15/2024",
                    address: "51417 La Follette Avenue",
                    rating: 5,
                    email: "wgoodship2@wired.com",
                    password: "$2a$04$W9yagCFueutFvqabUHgL9.SIKARf8zsHA6VclJKTDEQ2k4eyLkLfS",
                    brandBike: "0409-1171",
                    modeCode: "Violet",
                    idBike: "$2a$04$/zOzvhL8ZQhwhzbmwC.Gg.eUJxfl0UD2tsrv9.8zDmOcWgBPiOU/q",
                    active: false,
                    longitude: -104.86783,
                    latitude: 50.65009
                }, {
                    _id: "6604e1ec5a6c5ad8711aebfc",
                    phoneNumber: "0776616811",
                    fullName: "Lynnell",
                    avatar: "http://dummyimage.com/220x100.png/5fa2dd/ffffff",
                    sex: "Female",
                    birthDay: "6/1/2023",
                    address: "5 Ilene Parkway",
                    rating: 4,
                    email: "lrideout3@de.vu",
                    password: "$2a$04$Y4aHyp1FpYiq/MLFAsc.pOrx15NS8aE1nTVldG3VL8ehqrCiFM5xi",
                    brandBike: "62175-312",
                    modeCode: "Red",
                    idBike: "$2a$04$2STPCuPNZ2fcPB7HbjSjdefI0g3..w6Q7UGIDLUZUygqfZWyw7QBa",
                    active: true,
                    longitude: 11.2533509,
                    latitude: 58.695946
                }, {
                    _id: "6604e1ec5a6c5ad8711aebfd",
                    phoneNumber: "0776616815",
                    fullName: "Tristam",
                    avatar: "http://dummyimage.com/103x100.png/ff4444/ffffff",
                    sex: "Male",
                    birthDay: "6/9/2023",
                    address: "97637 Springview Center",
                    rating: 2,
                    email: "twestmacott4@census.gov",
                    password: "$2a$04$EIjH7l0A6Na8Ws5S2QXH8.h/u2T/ppdJrK.ivjKUJGDspix9J2uZi",
                    brandBike: "49643-373",
                    modeCode: "Violet",
                    idBike: "$2a$04$ONJxx1ONd3XgiHR0oMziyOrOSuYnKfdusIFgzxqGc8p1ieayGug0q",
                    active: true,
                    longitude: -75.2435307,
                    latitude: 20.5800358
                }

            ])
            return { result: true, customerNew: shippers }
        } catch (error) {
            return { result: false, customerNew: error }
        }
    }


    async createShipper(shipperDto: ShipperDto) {
        try {

            const phoneNumber = shipperDto.phoneNumber;
            const email = shipperDto.email;
            const password = shipperDto.password;
            const avatar = shipperDto.avatar;
            const fullName = shipperDto.fullName;
            const rating = shipperDto.rating;
            const sex = shipperDto.sex;
            const birthDay = shipperDto.birthDay;
            const address = shipperDto.address;
            const brandBike = shipperDto.brandBike;
            const modeCode = shipperDto.modeCode;
            const idBike = shipperDto.idBike;
            const active = shipperDto.active;
            const longitude = shipperDto.longitude;
            const latitude = shipperDto.latitude;

            const hashPass = await bcrypt.hash(password, 10)

            const newShipper = new this.shipperModel({
                phoneNumber: phoneNumber,
                email: email,
                password: hashPass,
                avatar: avatar,
                fullName: fullName,
                rating: rating,
                sex: sex,
                birthDay: birthDay,
                address: address,
                brandBike: brandBike,
                modeCode: modeCode,
                idBike: idBike,
                active: active,
                longitude: longitude,
                latitude: latitude
            });
            if (!newShipper) throw new HttpException("Create Failed", HttpStatus.NOT_FOUND);
            await newShipper.save();

            return { result: true, createShipper: newShipper }

        } catch (error) {
            return { result: false, createShipper: error }
        }
    }


    async getAllShipper() {
        try {
            const shippers = await this.shipperModel.find();
            if (!shippers) return { Message: "Not found Order" }
            return { result: true, AllShipper: shippers }
        } catch (error) {
            return { result: false, AllShipper: error }
        }
    }

    async getHistory(id: string) {
        try {
            const orders = await this.orderModel.find({shipperID: id }).sort({ timeBook: 1});
            if (!orders) throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
            return { result: true, historyShipper: orders }
        } catch (error) {
            return { result: false, historyShipper: error }
        }
    }

    async updateLocation(id: string, longitude: number, latitude: number) {
        try {
            const shipper = await this.shipperModel.findByIdAndUpdate(id,
                { longitude: longitude, latitude: latitude },
                { new: true });
            if (!shipper) throw new HttpException("Update fail location", HttpStatus.NOT_FOUND);
            await shipper.save();
            return { result: true, newLocation: shipper }

        } catch (error) {
            return { result: false, newLocation: error }
        }
    }
    getShipperById(id: string) {
        return this.shipperModel.findById(id);
    }


    async deleteShipper(id: string) {
        try {
            const ShipperById = await this.shipperModel.findById(id);

            // const UserID = ShipperById.userID;
            // console.log(UserID);
            const updateUserID = await this.shipperModel.findByIdAndUpdate(ShipperById, { deleted: true }, { new: true })
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
            const shipperNew = await this.shipperModel.findByIdAndUpdate(id, updateShipper, { new: true });
            return { shipperNew: shipperNew }
        } catch (error) {
            console.error('Error updating shipper:', error);
            throw error;
        }
    }
    async updateAvatar(id: string, avatar: string) {
        return await this.shipperModel.findByIdAndUpdate(id, { avatar });
    }
}
