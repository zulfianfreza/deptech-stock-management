import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { CreateTransactionDto } from "./dto/transaction.dto";

@Controller("transaction")
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  findAll(@Query("productId") productId?: string) {
    if (productId) {
      return this.transactionService.findByProduct(productId);
    }
    return this.transactionService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.transactionService.findOne(id);
  }

  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.transactionService.remove(id);
  }
}
