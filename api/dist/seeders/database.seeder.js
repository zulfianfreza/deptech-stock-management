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
exports.DatabaseSeeder = void 0;
const common_1 = require("@nestjs/common");
const admin_seeder_1 = require("./admin.seeder");
const category_seeder_1 = require("./category.seeder");
let DatabaseSeeder = class DatabaseSeeder {
    constructor(adminSeeder, categorySeeder) {
        this.adminSeeder = adminSeeder;
        this.categorySeeder = categorySeeder;
    }
    async run() {
        console.log('Starting database seeding...');
        try {
            await this.adminSeeder.seed();
            await this.categorySeeder.seed();
            console.log('Database seeding completed successfully!');
        }
        catch (error) {
            console.error('Database seeding failed:', error);
            throw error;
        }
    }
};
exports.DatabaseSeeder = DatabaseSeeder;
exports.DatabaseSeeder = DatabaseSeeder = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_seeder_1.AdminSeeder,
        category_seeder_1.CategorySeeder])
], DatabaseSeeder);
//# sourceMappingURL=database.seeder.js.map