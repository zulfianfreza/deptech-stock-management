import { AdminService } from "./admin.service";
import { CreateAdminDto, UpdateAdminDto } from "./dto/admin.dto";
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    create(createAdminDto: CreateAdminDto): Promise<import("./admin.entity").Admin>;
    findAll(): Promise<import("./admin.entity").Admin[]>;
    findOne(id: string): Promise<import("./admin.entity").Admin>;
    update(id: string, updateAdminDto: UpdateAdminDto): Promise<import("./admin.entity").Admin>;
    remove(id: string): Promise<void>;
}
