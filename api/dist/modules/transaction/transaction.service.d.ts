import { Repository, DataSource } from "typeorm";
import { Transaction } from "./transaction.entity";
import { Product } from "../product/product.entity";
import { CreateTransactionDto } from "./dto/transaction.dto";
export declare class TransactionService {
    private transactionRepository;
    private productRepository;
    private dataSource;
    constructor(transactionRepository: Repository<Transaction>, productRepository: Repository<Product>, dataSource: DataSource);
    create(createTransactionDto: CreateTransactionDto): Promise<Transaction>;
    findAll(): Promise<Transaction[]>;
    findOne(id: string): Promise<Transaction>;
    findByProduct(productId: string): Promise<Transaction[]>;
    remove(id: string): Promise<void>;
}
