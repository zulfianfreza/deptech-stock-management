import { Product } from "../product/product.entity";
export declare class Category {
    id: string;
    name: string;
    description: string;
    products: Product[];
    createdAt: Date;
    updatedAt: Date;
    constructor();
}
