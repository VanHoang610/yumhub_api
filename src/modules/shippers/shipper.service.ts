import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { promises } from 'dns';
import { Model } from 'mongoose';
import { ShipperDto } from 'src/dto/dto.shipper';
import { Shipper } from 'src/schemas/shipper.schema';
import { User } from 'src/schemas/user.schemas';

@Injectable()
export class ShipperService {

    constructor(@InjectModel(Shipper.name) private shippers: Model<Shipper>,
        @InjectModel(User.name) private users: Model<User>) { }
        
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
