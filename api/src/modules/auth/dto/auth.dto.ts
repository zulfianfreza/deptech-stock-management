import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from "class-validator";

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsDateString()
  dob?: string;

  @IsOptional()
  @IsEnum(["male", "female", "other"])
  gender?: string;
}

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @IsString()
  @MinLength(8, { message: "New password must be at least 8 characters long" })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      "New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  })
  newPassword: string;
}
