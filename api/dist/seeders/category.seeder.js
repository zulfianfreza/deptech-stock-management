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
exports.CategorySeeder = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../modules/category/category.entity");
const product_entity_1 = require("../modules/product/product.entity");
let CategorySeeder = class CategorySeeder {
    constructor(categoryRepository, productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }
    async seed() {
        const existingCategories = await this.categoryRepository.count();
        if (existingCategories > 0) {
            console.log("Category seeder: Categories already exist, skipping...");
            return;
        }
        const categories = [
            {
                name: "Electronics",
                description: "Electronic devices and gadgets",
            },
            {
                name: "Clothing",
                description: "Fashion and apparel items",
            },
            {
                name: "Books",
                description: "Books and educational materials",
            },
            {
                name: "Home & Garden",
                description: "Home improvement and garden supplies",
            },
        ];
        const savedCategories = [];
        for (const categoryData of categories) {
            const category = this.categoryRepository.create(categoryData);
            const savedCategory = await this.categoryRepository.save(category);
            savedCategories.push(savedCategory);
        }
        console.log("Category seeder: Sample categories created successfully!");
        await this.seedProducts(savedCategories);
    }
    async seedProducts(categories) {
        const products = [
            {
                name: "Laptop Gaming",
                description: "High-performance gaming laptop with RTX graphics",
                categoryId: categories[0].id,
                stock: 15,
            },
            {
                name: "Smartphone",
                description: "Latest smartphone with advanced camera features",
                categoryId: categories[0].id,
                stock: 25,
            },
            {
                name: "T-Shirt Cotton",
                description: "Comfortable cotton t-shirt for daily wear",
                categoryId: categories[1].id,
                stock: 50,
            },
            {
                name: "Programming Book",
                description: "Complete guide to modern programming",
                categoryId: categories[2].id,
                stock: 30,
            },
            {
                name: "Garden Tools Set",
                description: "Complete set of garden maintenance tools",
                categoryId: categories[3].id,
                stock: 10,
            },
        ];
        for (const productData of products) {
            const product = this.productRepository.create(productData);
            await this.productRepository.save(product);
        }
        console.log("Product seeder: Sample products created successfully!");
    }
};
exports.CategorySeeder = CategorySeeder;
exports.CategorySeeder = CategorySeeder = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CategorySeeder);
//# sourceMappingURL=category.seeder.js.map