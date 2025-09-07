import { ProductService } from "./product.service";
import { CreateProductDto, UpdateProductDto } from "./dto/product.dto";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto): Promise<import("./product.entity").Product>;
    findAll(): Promise<import("./product.entity").Product[]>;
    findOne(id: string): Promise<import("./product.entity").Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("./product.entity").Product>;
    remove(id: string): Promise<void>;
}
