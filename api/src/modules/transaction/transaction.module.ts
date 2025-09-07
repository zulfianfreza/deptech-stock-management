import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction } from './transaction.entity';
import { Product } from '../product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Product])],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
