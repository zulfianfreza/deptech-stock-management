import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";
import { Admin } from "../admin/admin.entity";
import { AdminService } from "../admin/admin.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || "your-secret-key",
      signOptions: { expiresIn: "24h" },
    }),
  ],
  providers: [AuthService, AdminService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
