import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../product/product.entity";

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

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
