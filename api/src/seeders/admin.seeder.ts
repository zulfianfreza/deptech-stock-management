import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Admin } from '../modules/admin/admin.entity';

@Injectable()
export class AdminSeeder {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async seed(): Promise<void> {
    // Check if admin already exists
    const existingAdmin = await this.adminRepository.findOne({
      where: { email: 'admin@example.com' },
    });

    if (existingAdmin) {
      console.log('Admin seeder: Admin already exists, skipping...');
      return;
    }

    // Create default admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = this.adminRepository.create({
      firstName: 'Super',
      lastName: 'Admin',
      email: 'admin@example.com',
      dob: new Date('1990-01-01'),
      gender: 'male',
      password: hashedPassword,
    });

    await this.adminRepository.save(admin);
    console.log('Admin seeder: Default admin created successfully!');
  }
}
