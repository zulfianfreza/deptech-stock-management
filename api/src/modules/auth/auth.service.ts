import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { Admin } from "../admin/admin.entity";
import { LoginDto, UpdatePasswordDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const admin = await this.adminRepository.findOne({ where: { email } });
    if (admin) {
      const checkPassword = await bcrypt.compare(password, admin.password);
      console.log(checkPassword);
      if (checkPassword) {
        const { password: _, ...result } = admin;
        return result;
      }
      return null;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const admin = await this.validateUser(loginDto.email, loginDto.password);
    if (!admin) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { email: admin.email, sub: admin.id };
    return {
      access_token: this.jwtService.sign(payload),
      admin: {
        id: admin.id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        dob: admin.dob,
        gender: admin.gender,
      },
    };
  }

  async logout() {
    return { message: "Logged out successfully" };
  }

  async updatePassword(adminId: string, updatePasswordDto: UpdatePasswordDto) {
    const { currentPassword, newPassword } = updatePasswordDto;

    // Validasi input
    if (!currentPassword || !newPassword) {
      throw new BadRequestException(
        "Current password and new password are required"
      );
    }

    if (currentPassword === newPassword) {
      throw new BadRequestException(
        "New password must be different from current password"
      );
    }

    // Cari admin berdasarkan ID
    const admin = await this.adminRepository.findOne({
      where: { id: adminId },
    });
    if (!admin) {
      throw new NotFoundException("Admin not found");
    }

    // Validasi current password
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      admin.password
    );
    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException("Current password is incorrect");
    }

    // Hash new password
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password di database
    await this.adminRepository.update(adminId, {
      password: hashedNewPassword,
      updatedAt: new Date(), // Jika ada field updatedAt
    });

    return {
      message: "Password updated successfully",
      timestamp: new Date().toISOString(),
    };
  }
}
