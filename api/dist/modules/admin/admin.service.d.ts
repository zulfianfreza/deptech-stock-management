import { Repository } from "typeorm";
import { Admin } from "./admin.entity";
import { CreateAdminDto, UpdateAdminDto } from "./dto/admin.dto";
export declare class AdminService {
    private adminRepository;
    constructor(adminRepository: Repository<Admin>);
    create(createAdminDto: CreateAdminDto): Promise<Admin>;
    findAll(): Promise<Admin[]>;
    findOne(id: string): Promise<Admin>;
    update(id: string, updateAdminDto: UpdateAdminDto): Promise<Admin>;
    remove(id: string): Promise<void>;
}
