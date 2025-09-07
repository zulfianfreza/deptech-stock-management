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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const category_entity_1 = require("../category/category.entity");
const transaction_entity_1 = require("../transaction/transaction.entity");
let Product = class Product {
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "category_id" }),
    __metadata("design:type", String)
], Product.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (category) => category.products),
    (0, typeorm_1.JoinColumn)({ name: "category_id" }),
    __metadata("design:type", category_entity_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => transaction_entity_1.Transaction, (transaction) => transaction.product),
    __metadata("design:type", Array)
], Product.prototype, "transactions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)("product"),
    __metadata("design:paramtypes", [])
], Product);
//# sourceMappingURL=product.entity.js.map