import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { Admin } from "../admin/admin.entity";
import { LoginDto, UpdatePasswordDto } from "./dto/auth.dto";
export declare class AuthService {
    private adminRepository;
    private jwtService;
    constructor(adminRepository: Repository<Admin>, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
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
    updatePassword(adminId: string, updatePasswordDto: UpdatePasswordDto): Promise<{
        message: string;
        timestamp: string;
    }>;
}
