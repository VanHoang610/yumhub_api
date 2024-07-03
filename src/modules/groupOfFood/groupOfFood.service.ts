import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food } from 'src/schemas/food.schema';
import { OrderStatus } from 'src/schemas/orderStatus.schema';
import { GroupOfFood } from 'src/schemas/groupOfFood.schema';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class GroupOfFoodService {
    constructor(@InjectModel(GroupOfFood.name) private groupFoodModel: Model<GroupOfFood>,
    @InjectModel(Food.name) private foodModel: Model<Food>,) {};
    
    async createGroupOfFood(merchantID: string, name: string) {
        const groupOfFood = new this.groupFoodModel({
            merchantID: merchantID,
            name: name
        })

        return await groupOfFood.save();
    }

    async updateGroupOfFood(id: string, name: string) {
        const updatedGroupOfFood = await this.groupFoodModel.findByIdAndUpdate(
            id,
            { name: name },
            { new: true }
        );
        
        if (!updatedGroupOfFood) {
            throw new NotFoundException(`GroupOfFood with id ${id} not found`);
        }
        
        return updatedGroupOfFood;
    }

    async deleteGroupOfFood(id: string) {
        await this.foodModel.findByIdAndUpdate({ groupOfFoodID: id }, { groupOfFoodID: null });
        const deleteGroup= await this.groupFoodModel.findByIdAndDelete(id);
        if (!deleteGroup) {
            throw new NotFoundException(`GroupOfFood with id ${id} not found`);
        }
        return deleteGroup;
    }

    async getAllGroupByMerchant(id : string) {
        return await this.groupFoodModel.find({ merchantID: id });
    }
}