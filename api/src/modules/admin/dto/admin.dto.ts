import {
  IsEmail,
  IsString,
  IsDateString,
  IsEnum,
  MinLength,
  IsOptional,
} from "class-validator";

export class CreateAdminDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsDateString()
  dob: string;

  @IsEnum(["male", "female", "other"])
  gender: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class UpdateAdminDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsDateString()
  dob?: string;

  @IsOptional()
  @IsEnum(["male", "female", "other"])
  gender?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}
