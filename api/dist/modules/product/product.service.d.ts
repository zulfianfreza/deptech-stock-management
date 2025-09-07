import { Repository } from "typeorm";
import { Product } from "./product.entity";
import { CreateProductDto, UpdateProductDto } from "./dto/product.dto";
export declare class ProductService {
    private productRepository;
    constructor(productRepository: Repository<Product>);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    remove(id: string): Promise<void>;
    updateStock(id: string, quantity: number, type: "in" | "out"): Promise<Product>;
}
