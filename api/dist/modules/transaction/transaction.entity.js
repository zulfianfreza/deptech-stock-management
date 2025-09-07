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
exports.Transaction = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const product_entity_1 = require("../product/product.entity");
let Transaction = class Transaction {
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
};
exports.Transaction = Transaction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Transaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "product_id" }),
    __metadata("design:type", String)
], Transaction.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: ["in", "out"] }),
    __metadata("design:type", String)
], Transaction.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Transaction.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.transactions),
    (0, typeorm_1.JoinColumn)({ name: "product_id" }),
    __metadata("design:type", product_entity_1.Product)
], Transaction.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Transaction.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Transaction.prototype, "updatedAt", void 0);
exports.Transaction = Transaction = __decorate([
    (0, typeorm_1.Entity)("transaction"),
    __metadata("design:paramtypes", [])
], Transaction);
//# sourceMappingURL=transaction.entity.js.map