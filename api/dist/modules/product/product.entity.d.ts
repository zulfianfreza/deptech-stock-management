import { Category } from "../category/category.entity";
import { Transaction } from "../transaction/transaction.entity";
export declare class Product {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    stock: number;
    category: Category;
    transactions: Transaction[];
    createdAt: Date;
    updatedAt: Date;
    constructor();
}
