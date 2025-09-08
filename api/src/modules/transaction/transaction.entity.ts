import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Product } from "../product/product.entity";

@Entity("transaction")
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "product_id" })
  productId: string;

  @Column({ type: "enum", enum: ["in", "out"] })
  type: "in" | "out";

  @Column({ type: "int" })
  quantity: number;

  @ManyToOne(() => Product, (product) => product.transactions)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
