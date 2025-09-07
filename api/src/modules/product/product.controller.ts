import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto, UpdateProductDto } from "./dto/product.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("product")
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.productService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.productService.remove(id);
  }
}
