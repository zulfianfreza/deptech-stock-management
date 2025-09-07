import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Category } from "../category/category.entity";
import { Transaction } from "../transaction/transaction.entity";

@Entity("product")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ name: "category_id" })
  categoryId: string;

  @Column({ type: "int", default: 0 })
  stock: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @OneToMany(() => Transaction, (transaction) => transaction.product)
  transactions: Transaction[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
