import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Admin } from '../admin/admin.entity';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private adminRepository;
    constructor(adminRepository: Repository<Admin>);
    validate(payload: any): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        dob: Date;
        gender: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
