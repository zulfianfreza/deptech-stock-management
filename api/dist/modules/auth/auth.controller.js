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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const public_decorator_1 = require("./public.decorator");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const auth_dto_1 = require("./dto/auth.dto");
const admin_service_1 = require("../admin/admin.service");
let AuthController = class AuthController {
    constructor(authService, adminService) {
        this.authService = authService;
        this.adminService = adminService;
    }
    async login(loginDto) {
        return this.authService.login(loginDto);
    }
    async logout() {
        return this.authService.logout();
    }
    async getMe(req) {
        return req.user;
    }
    update(req, updateAdminDto) {
        return this.adminService.update(req.user.id, updateAdminDto);
    }
    async updatePassword(req, updatePasswordDto) {
        const adminId = req.user.id;
        return this.authService.updatePassword(adminId, updatePasswordDto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("logout"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)("me"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getMe", null);
__decorate([
    (0, common_1.Patch)("/update-profile"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "update", null);
__decorate([
    (0, common_1.Put)("update-password"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.UpdatePasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updatePassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        admin_service_1.AdminService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map