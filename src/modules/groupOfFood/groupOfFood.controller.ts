import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { GroupOfFoodService } from "./groupOfFood.service";
import { AuthGuard } from "src/helper/auth.middleware";


@Controller('groupFood')
export class GroupOfFoodController {
    constructor(private readonly groupFoodServices: GroupOfFoodService) { }
    @Post('create')
    @UseGuards(AuthGuard)
        async createGroupOfFood(@Body() body: { merchantID: string, name: string }) {
            const {merchantID, name} = body;
        return await this.groupFoodServices.createGroupOfFood(merchantID, name);
    }

    @Get('delete')
    @UseGuards(AuthGuard)
    async deleteGroupOfFood(@Query('id') id: string) {
        return await this.groupFoodServices.deleteGroupOfFood(id);
    }

    @Post('update')
    @UseGuards(AuthGuard)
    async updateGroupOfFood(@Query('id') id: string, @Body() body: { name: string }) {
        const { name } = body;
        return await this.groupFoodServices.updateGroupOfFood(id, name);
    }
    
    @Get('getAll')
    @UseGuards(AuthGuard)
    async getAllGroupOfFood(@Query('id') id: string) {
        return await this.groupFoodServices.getAllGroupByMerchant(id);
    }

}