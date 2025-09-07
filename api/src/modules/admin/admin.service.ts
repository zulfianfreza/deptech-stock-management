import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { Admin } from "./admin.entity";
import { CreateAdminDto, UpdateAdminDto } from "./dto/admin.dto";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    // Check if email already exists
    const existingAdmin = await this.adminRepository.findOne({
      where: { email: createAdminDto.email },
    });
    if (existingAdmin) {
      throw new ConflictException("Email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);

    const admin = this.adminRepository.create({
      ...createAdminDto,
      password: hashedPassword,
    });

    return this.adminRepository.save(admin);
  }

  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find({
      select: [
        "id",
        "firstName",
        "lastName",
        "email",
        "dob",
        "gender",
        "createdAt",
        "updatedAt",
      ],
    });
  }

  async findOne(id: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      where: { id },
      select: [
        "id",
        "firstName",
        "lastName",
        "email",
        "dob",
        "gender",
        "createdAt",
        "updatedAt",
      ],
    });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    return admin;
  }

  async update(id: string, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }

    // Check if email already exists (if email is being updated)
    if (updateAdminDto.email && updateAdminDto.email !== admin.email) {
      const existingAdmin = await this.adminRepository.findOne({
        where: { email: updateAdminDto.email },
      });
      if (existingAdmin) {
        throw new ConflictException("Email already exists");
      }
    }

    // Hash password if it's being updated
    if (updateAdminDto.password) {
      updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, 10);
    }

    await this.adminRepository.update(id, updateAdminDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    await this.adminRepository.remove(admin);
  }
}
