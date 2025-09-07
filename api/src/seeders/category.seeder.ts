import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../modules/category/category.entity";
import { Product } from "../modules/product/product.entity";

@Injectable()
export class CategorySeeder {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  async seed(): Promise<void> {
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

  private async seedProducts(categories: Category[]): Promise<void> {
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
}
