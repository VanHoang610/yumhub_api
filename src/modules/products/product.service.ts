import { Injectable } from "@nestjs/common/decorators/core";

@Injectable()
export class ProductService {
    getProducts(): string {
        return 'List Product nè';
    }

    addProduct(): string {
        return 'Add nè';
    }

    detailProduct(): string {
        return 'Detail Product';
    }

    updateProduct(): string {
        return 'Update Product';
    }

    deleteProduct(): string {
        return 'Delete Product'
    }
}