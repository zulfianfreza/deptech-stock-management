import { Repository } from 'typeorm';
import { Admin } from '../modules/admin/admin.entity';
export declare class AdminSeeder {
    private adminRepository;
    constructor(adminRepository: Repository<Admin>);
    seed(): Promise<void>;
}
