import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food } from 'src/schemas/food.schema';
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
        // Update all documents in the foodModel where groupOfFood matches the id
        await this.foodModel.updateMany({ groupOfFood: id }, { $set: { groupOfFood: null } });
    
        // Delete the groupFoodModel document by its id
        const deleteGroup = await this.groupFoodModel.findByIdAndDelete(id);
        if (!deleteGroup) {
            throw new NotFoundException(`GroupOfFood with id ${id} not found`);
        }
        return {
            result: true,
            data: "đã xoá thành công group"+ deleteGroup.name
        };
    }
    

    async getAllGroupByMerchant(id : string) {
        return await this.groupFoodModel.find({ merchantID: id });
    }
}