import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("admin")
export class Admin {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: "date" })
  dob: Date;

  @Column({ type: "enum", enum: ["male", "female", "other"] })
  gender: string;

  @Column()
  password: string;

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
