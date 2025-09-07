import { Product } from "../product/product.entity";
export declare class Transaction {
    id: string;
    productId: string;
    type: "in" | "out";
    quantity: number;
    product: Product;
    createdAt: Date;
    updatedAt: Date;
    constructor();
}
