import { Repository } from "typeorm";
import { Category } from "./category.entity";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto/category.dto";
export declare class CategoryService {
    private categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findAll(): Promise<Category[]>;
    findOne(id: string): Promise<Category>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    remove(id: string): Promise<void>;
}
