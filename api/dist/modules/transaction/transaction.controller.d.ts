import { TransactionService } from "./transaction.service";
import { CreateTransactionDto } from "./dto/transaction.dto";
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    create(createTransactionDto: CreateTransactionDto): Promise<import("./transaction.entity").Transaction>;
    findAll(productId?: string): Promise<import("./transaction.entity").Transaction[]>;
    findOne(id: string): Promise<import("./transaction.entity").Transaction>;
    remove(id: string): Promise<void>;
}
