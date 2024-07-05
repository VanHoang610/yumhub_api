import { FoodStatus } from "src/schemas/foodStatus.schema";
import { GroupOfFood } from "src/schemas/groupOfFood.schema";

export class UpdateFoodDto {
    priceForSale: number;
    status: FoodStatus;
    groupOfFood: GroupOfFood;
}