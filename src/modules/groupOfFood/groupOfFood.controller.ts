import { Controller, Post, Query, UseGuards } from "@nestjs/common";
import { GroupOfFoodService } from "./groupOfFood.service";
import { AuthGuard } from "src/helper/auth.middleware";


@Controller('groupFood')
export class GroupOfFoodController {
    constructor(private readonly groupFoodServices: GroupOfFoodService) { }

    @Post('create')
    @UseGuards(AuthGuard)
    async createGroupOfFood(@Query('merchantID') merchantID: string, @Query('name') name: string) {
        return await this.groupFoodServices.createGroupOfFood(merchantID, name);
    }

    @Post('update')
    @UseGuards(AuthGuard)
    async updateGroupOfFood(@Query('id') id: string, @Query('name') name: string) {
        return await this.groupFoodServices.updateGroupOfFood(id, name);
    }

    @Post('delete')
    @UseGuards(AuthGuard)
    async deleteGroupOfFood(@Query('id') id: string) {
        return await this.groupFoodServices.deleteGroupOfFood(id);
    }


}