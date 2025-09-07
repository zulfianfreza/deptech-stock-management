import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminSeeder } from './admin.seeder';
import { CategorySeeder } from './category.seeder';
import { DatabaseSeeder } from './database.seeder';
import { Admin } from '../modules/admin/admin.entity';
import { Category } from '../modules/category/category.entity';
import { Product } from '../modules/product/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Category, Product]),
  ],
  providers: [AdminSeeder, CategorySeeder, DatabaseSeeder],
  exports: [DatabaseSeeder],
})
export class SeederModule {}
