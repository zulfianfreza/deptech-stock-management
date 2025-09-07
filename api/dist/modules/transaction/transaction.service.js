"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transaction_entity_1 = require("./transaction.entity");
const product_entity_1 = require("../product/product.entity");
let TransactionService = class TransactionService {
    constructor(transactionRepository, productRepository, dataSource) {
        this.transactionRepository = transactionRepository;
        this.productRepository = productRepository;
        this.dataSource = dataSource;
    }
    async create(createTransactionDto) {
        const { productId, type, quantity } = createTransactionDto;
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${productId} not found`);
        }
        if (type === "out" && product.stock < quantity) {
            throw new common_1.BadRequestException("Insufficient stock");
        }
        return await this.dataSource.transaction(async (manager) => {
            const transaction = manager.create(transaction_entity_1.Transaction, createTransactionDto);
            const savedTransaction = await manager.save(transaction_entity_1.Transaction, transaction);
            const newStock = type === "in" ? product.stock + quantity : product.stock - quantity;
            await manager.update(product_entity_1.Product, productId, { stock: newStock });
            return manager.findOne(transaction_entity_1.Transaction, {
                where: { id: savedTransaction.id },
                relations: ["product"],
            });
        });
    }
    async findAll() {
        return this.transactionRepository.find({
            relations: ["product", "product.category"],
            order: { createdAt: "DESC" },
        });
    }
    async findOne(id) {
        const transaction = await this.transactionRepository.findOne({
            where: { id },
            relations: ["product", "product.category"],
        });
        if (!transaction) {
            throw new common_1.NotFoundException(`Transaction with ID ${id} not found`);
        }
        return transaction;
    }
    async findByProduct(productId) {
        return this.transactionRepository.find({
            where: { productId },
            relations: ["product"],
            order: { createdAt: "DESC" },
        });
    }
    async remove(id) {
        const transaction = await this.transactionRepository.findOne({
            where: { id },
            relations: ["product"],
        });
        if (!transaction) {
            throw new common_1.NotFoundException(`Transaction with ID ${id} not found`);
        }
        await this.dataSource.transaction(async (manager) => {
            const product = transaction.product;
            const newStock = transaction.type === "in"
                ? product.stock - transaction.quantity
                : product.stock + transaction.quantity;
            await manager.update(product_entity_1.Product, product.id, { stock: newStock });
            await manager.remove(transaction_entity_1.Transaction, transaction);
        });
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map