import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { SeederModule } from './seeders/seeder.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    AdminModule,
    CategoryModule,
    ProductModule,
    TransactionModule,
    SeederModule,
  ],
})
export class AppModule {}
