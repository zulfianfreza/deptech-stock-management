import { CategoryService } from "./category.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto/category.dto";
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<import("./category.entity").Category>;
    findAll(): Promise<import("./category.entity").Category[]>;
    findOne(id: string): Promise<import("./category.entity").Category>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<import("./category.entity").Category>;
    remove(id: string): Promise<void>;
}
