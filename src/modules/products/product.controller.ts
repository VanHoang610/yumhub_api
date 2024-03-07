import { Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";

@Controller('products')
export class ProductController {

    constructor(private readonly productService: ProductService) { }
    @Get()
    getProducts(): ResponseData<string> {
        try {
            return new ResponseData<string>(this.productService.getProducts(), HttpStatus.SECCESS, HttpMessage.SECCESS);
        } catch (error) {
            return new ResponseData<string>(this.productService.getProducts(), HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Post()
    addProduct(): ResponseData<string> {
        try {
            return new ResponseData<string>(this.productService.addProduct(), HttpStatus.SECCESS, HttpMessage.SECCESS);
        } catch (error) {
            return new ResponseData<string>(this.productService.addProduct(), HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get('/:id')
    detailProduct(): ResponseData<string> {try {
        return new ResponseData<string>(this.productService.detailProduct(), HttpStatus.SECCESS, HttpMessage.SECCESS);
    } catch (error) {
        return new ResponseData<string>(this.productService.detailProduct(), HttpStatus.ERROR, HttpMessage.ERROR);
    } 
    }

    @Put('/:id')
    updateProduct(): ResponseData<string> {
        try {
            return new ResponseData<string>(this.productService.updateProduct(), HttpStatus.SECCESS, HttpMessage.SECCESS);
        } catch (error) {
            return new ResponseData<string>(this.productService.updateProduct(), HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Delete('/:id')
    deleteProduct(): ResponseData<string> {
        try {
            return new ResponseData<string>(this.productService.deleteProduct(), HttpStatus.SECCESS, HttpMessage.SECCESS);
        } catch (error) {
            return new ResponseData<string>(this.productService.deleteProduct(), HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }
}