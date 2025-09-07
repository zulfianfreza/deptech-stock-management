import { AuthService } from "./auth.service";
import { LoginDto, UpdatePasswordDto, UpdateProfileDto } from "./dto/auth.dto";
import { AdminService } from "../admin/admin.service";
export declare class AuthController {
    private authService;
    private adminService;
    constructor(authService: AuthService, adminService: AdminService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        admin: {
            id: any;
            firstName: any;
            lastName: any;
            email: any;
            dob: any;
            gender: any;
        };
    }>;
    logout(): Promise<{
        message: string;
    }>;
    getMe(req: any): Promise<any>;
    update(req: any, updateAdminDto: UpdateProfileDto): Promise<import("../admin/admin.entity").Admin>;
    updatePassword(req: any, updatePasswordDto: UpdatePasswordDto): Promise<{
        message: string;
        timestamp: string;
    }>;
}
