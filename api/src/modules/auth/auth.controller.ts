import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  ParseUUIDPipe,
  Patch,
  Put,
} from "@nestjs/common";
import { AuthService } from "./auth.service";

import { Public } from "./public.decorator";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { LoginDto, UpdatePasswordDto, UpdateProfileDto } from "./dto/auth.dto";
import { AdminService } from "../admin/admin.service";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private adminService: AdminService
  ) {}

  @Public()
  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post("logout")
  async logout() {
    return this.authService.logout();
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  async getMe(@Request() req) {
    return req.user;
  }

  @Patch("/update-profile")
  @UseGuards(JwtAuthGuard)
  update(@Request() req, @Body() updateAdminDto: UpdateProfileDto) {
    return this.adminService.update(req.user.id, updateAdminDto);
  }

  @Put("update-password")
  @UseGuards(JwtAuthGuard)
  async updatePassword(
    @Request() req,
    @Body() updatePasswordDto: UpdatePasswordDto
  ) {
    const adminId = req.user.id;
    return this.authService.updatePassword(adminId, updatePasswordDto);
  }
}
