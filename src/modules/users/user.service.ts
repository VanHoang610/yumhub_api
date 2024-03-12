import { Injectable } from "@nestjs/common/decorators/core";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDto } from "src/dto/dto.uses";
import { User } from "src/schemas/user.schemas";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private users: Model<User>) {}

    createUser(userDto: UserDto) {
        const newUser = new this.users(userDto)
        return newUser.save();
    }

    getAllUser() {
        return this.users.find();
    }
}
