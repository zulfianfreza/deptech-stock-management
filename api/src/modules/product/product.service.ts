import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./product.entity";
import { CreateProductDto, UpdateProductDto } from "./dto/product.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ["category", "transactions"],
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ["category", "transactions"],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    await this.productRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.productRepository.remove(product);
  }

  async updateStock(
    id: string,
    quantity: number,
    type: "in" | "out"
  ): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (type === "out" && product.stock < quantity) {
      throw new BadRequestException("Insufficient stock");
    }

    const newStock =
      type === "in" ? product.stock + quantity : product.stock - quantity;

    await this.productRepository.update(id, { stock: newStock });
    return this.findOne(id);
  }
}
