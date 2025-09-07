import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto, UpdateAdminDto } from "./dto/admin.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("admin")
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateAdminDto: UpdateAdminDto
  ) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.adminService.remove(id);
  }
}
