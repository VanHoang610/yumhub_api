import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from "@nestjs/common";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { UserService } from "./user.service";
import { UserDto } from "src/dto/dto.uses";

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post()
    createUser(@Body(new ValidationPipe()) userDto: UserDto){
        console.log(userDto);
        return this.userService.createUser(userDto);
    }

    @Get()
    getAllUser() {
        return this.userService.getAllUser();
    }

}