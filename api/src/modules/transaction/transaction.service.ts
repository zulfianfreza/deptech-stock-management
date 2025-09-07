import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource } from "typeorm";
import { Transaction } from "./transaction.entity";
import { Product } from "../product/product.entity";
import { CreateTransactionDto } from "./dto/transaction.dto";

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private dataSource: DataSource
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto
  ): Promise<Transaction> {
    const { productId, type, quantity } = createTransactionDto;

    // Check if product exists
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    // Validate stock for 'out' transactions
    if (type === "out" && product.stock < quantity) {
      throw new BadRequestException("Insufficient stock");
    }

    // Use transaction to ensure data consistency
    return await this.dataSource.transaction(async (manager) => {
      // Create transaction record
      const transaction = manager.create(Transaction, createTransactionDto);
      const savedTransaction = await manager.save(Transaction, transaction);

      // Update product stock
      const newStock =
        type === "in" ? product.stock + quantity : product.stock - quantity;

      await manager.update(Product, productId, { stock: newStock });

      // Return transaction with product relation
      return manager.findOne(Transaction, {
        where: { id: savedTransaction.id },
        relations: ["product"],
      });
    });
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find({
      relations: ["product", "product.category"],
      order: { createdAt: "DESC" },
    });
  }

  async findOne(id: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: ["product", "product.category"],
    });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return transaction;
  }

  async findByProduct(productId: string): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: { productId },
      relations: ["product"],
      order: { createdAt: "DESC" },
    });
  }

  async remove(id: string): Promise<void> {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: ["product"],
    });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    // Use transaction to ensure data consistency
    await this.dataSource.transaction(async (manager) => {
      // Reverse the stock change
      const product = transaction.product;
      const newStock =
        transaction.type === "in"
          ? product.stock - transaction.quantity
          : product.stock + transaction.quantity;

      // Update product stock
      await manager.update(Product, product.id, { stock: newStock });

      // Remove transaction
      await manager.remove(Transaction, transaction);
    });
  }
}
