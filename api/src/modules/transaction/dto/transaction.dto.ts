import { IsString, IsUUID, IsInt, IsEnum, Min } from "class-validator";

export class CreateTransactionDto {
  @IsUUID()
  productId: string;

  @IsEnum(["in", "out"])
  type: "in" | "out";

  @IsInt()
  @Min(1)
  quantity: number;
}
