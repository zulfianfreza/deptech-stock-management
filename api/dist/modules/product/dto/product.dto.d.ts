export declare class CreateProductDto {
    name: string;
    description?: string;
    image?: string;
    categoryId: string;
    stock: number;
}
export declare class UpdateProductDto {
    name?: string;
    description?: string;
    image?: string;
    categoryId?: string;
    stock?: number;
}
