import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodDto } from 'src/dto/dto.food';
import { AuthGuard } from 'src/helper/auth.middleware';
import { UpdateFoodDto } from 'src/dto/dto.updateFood';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}
  @Post('create')
  createFood(@Body() foodDto: FoodDto) {
    return this.foodService.createFood(foodDto);
  }

  @Post('Status')
  @UseGuards(AuthGuard)
  setFood(@Body() body: { ID: string; status: number }) {
    try {
      const { ID, status } = body;
      const setStatusFood = this.foodService.setStatusFood(ID, status);
      if (!setStatusFood) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      return setStatusFood;
    } catch (error) {
      return error;
    }
  }

  @Post('getFoodByStatus')
  @UseGuards(AuthGuard)
  getFoodByStatus(@Body() body: { status: number }) {
    try {
      const { status } = body;
      return this.foodService.getFoodByStatus(status);
    } catch (error) {
      return error;
    }
  }

  @Get('getFoodById')
  @UseGuards(AuthGuard)
  getFoodById(@Query('id') id: string) {
    try {
      return this.foodService.getFoodById(id);
    } catch (error) {
      return error;
    }
  }
  @Get('getFoodByMerchant')
  @UseGuards(AuthGuard)
  getFoodByMerchant(@Query('id') id: string) {
    try {
      return this.foodService.getFoodByMerchant(id);
    } catch (error) {
      return error;
    }
  }

  //tìm kiếm food đang phê duyệt
  @Post('findApproveFood')
  @UseGuards(AuthGuard)
  findApproveFood(@Body() body: { keyword: string }) {
    const { keyword } = body;
    return this.foodService.findApproveFood(keyword);
  }

  // @Patch("updateImg/:id")
  // async updateImg(@Param('id') id: string, @Body() body: { img: string }) {
  //     try {
  //         const { img } = body
  //         return await this.foodService.updateImg(id, img);
  //     } catch (error) {
  //         return error
  //     }

  // }

  @Get('searchNameFood')
  @UseGuards(AuthGuard)
  searchFood(@Query('any') any: string) {
    try {
      return this.foodService.searchFoodByName(any);
    } catch (error) {
      return error;
    }
  }
  @Get('search')
  @UseGuards(AuthGuard)
  async searchFoods(@Body() body: { price: number; name: string }) {
    try {
      const { price, name } = body;
      return this.foodService.searchFoods(price, name);
    } catch (error) {
      return error;
    }
  }

  @Patch('updateFood')
  @UseGuards(AuthGuard)
  updateFood(@Query('id') id: string ,@Body()  update: UpdateFoodDto) {
    try {
      return this.foodService.updateFood(id, update);
    } catch (error) {
      return error;
    }
  }

  @Get('getAllFoods')
  @UseGuards(AuthGuard)
  getAllFoods() {
    try {
      return this.foodService.getAllFoods();
    } catch (error) {
      return error;
    }
  }

}
