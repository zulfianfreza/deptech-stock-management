import { Repository } from "typeorm";
import { Category } from "../modules/category/category.entity";
import { Product } from "../modules/product/product.entity";
export declare class CategorySeeder {
    private categoryRepository;
    private productRepository;
    constructor(categoryRepository: Repository<Category>, productRepository: Repository<Product>);
    seed(): Promise<void>;
    private seedProducts;
}
