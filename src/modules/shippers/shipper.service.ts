import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShipperDto } from 'src/dto/dto.shipper';
import { Shipper } from 'src/schemas/shipper.schema';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ShipperService {

    constructor(@InjectModel(Shipper.name) private shipperModel: Model<Shipper>) { }

    async createShipper({ userID, ...shipperDto }: ShipperDto) {

        try {
            if (userID) {
                const passHash = await bcrypt.hash(userID.password, 10);

                const newUser = new this.shipperModel({ ...userID, password: passHash });
                const saveShipper = await newUser.save();
                const newShippers = new this.shipperModel({
                    ...shipperDto,
                    userID: saveShipper._id,
                });
                return newShippers.save();
            }

            const newShippers = new this.shipperModel(shipperDto)
            return newShippers.save();
        } catch (error) {
            console.error("Create Shipper Fail", error)
        }
    }


    async getAllShipper() {
            try {
                const shippers = this.shipperModel.find();
                if (!shippers) return { Message: "Not found Order" }
                return { GetAllShipper: shippers }
            } catch (error) {
                return { GetAllShipper: error }
            }
        }

    }
