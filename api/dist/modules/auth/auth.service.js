"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const admin_entity_1 = require("../admin/admin.entity");
let AuthService = class AuthService {
    constructor(adminRepository, jwtService) {
        this.adminRepository = adminRepository;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
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
    async login(loginDto) {
        const admin = await this.validateUser(loginDto.email, loginDto.password);
        if (!admin) {
            throw new common_1.UnauthorizedException("Invalid credentials");
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
    async updatePassword(adminId, updatePasswordDto) {
        const { currentPassword, newPassword } = updatePasswordDto;
        if (!currentPassword || !newPassword) {
            throw new common_1.BadRequestException("Current password and new password are required");
        }
        if (currentPassword === newPassword) {
            throw new common_1.BadRequestException("New password must be different from current password");
        }
        const admin = await this.adminRepository.findOne({
            where: { id: adminId },
        });
        if (!admin) {
            throw new common_1.NotFoundException("Admin not found");
        }
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, admin.password);
        if (!isCurrentPasswordValid) {
            throw new common_1.UnauthorizedException("Current password is incorrect");
        }
        const saltRounds = 12;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
        await this.adminRepository.update(adminId, {
            password: hashedNewPassword,
            updatedAt: new Date(),
        });
        return {
            message: "Password updated successfully",
            timestamp: new Date().toISOString(),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map