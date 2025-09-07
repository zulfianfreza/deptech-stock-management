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
import { CategoryService } from "./category.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto/category.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("category")
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.categoryService.remove(id);
  }
}
