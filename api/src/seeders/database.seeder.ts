import { Injectable } from '@nestjs/common';
import { AdminSeeder } from './admin.seeder';
import { CategorySeeder } from './category.seeder';

@Injectable()
export class DatabaseSeeder {
  constructor(
    private adminSeeder: AdminSeeder,
    private categorySeeder: CategorySeeder,
  ) {}

  async run(): Promise<void> {
    console.log('Starting database seeding...');
    
    try {
      await this.adminSeeder.seed();
      await this.categorySeeder.seed();
      
      console.log('Database seeding completed successfully!');
    } catch (error) {
      console.error('Database seeding failed:', error);
      throw error;
    }
  }
}
