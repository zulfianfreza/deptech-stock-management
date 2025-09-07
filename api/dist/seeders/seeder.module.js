"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const admin_seeder_1 = require("./admin.seeder");
const category_seeder_1 = require("./category.seeder");
const database_seeder_1 = require("./database.seeder");
const admin_entity_1 = require("../modules/admin/admin.entity");
const category_entity_1 = require("../modules/category/category.entity");
const product_entity_1 = require("../modules/product/product.entity");
let SeederModule = class SeederModule {
};
exports.SeederModule = SeederModule;
exports.SeederModule = SeederModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([admin_entity_1.Admin, category_entity_1.Category, product_entity_1.Product]),
        ],
        providers: [admin_seeder_1.AdminSeeder, category_seeder_1.CategorySeeder, database_seeder_1.DatabaseSeeder],
        exports: [database_seeder_1.DatabaseSeeder],
    })
], SeederModule);
//# sourceMappingURL=seeder.module.js.map