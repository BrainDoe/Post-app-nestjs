import { IsNumber, IsString, IsNotEmpty , IsPositive, IsOptional, IsEmail } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginUserDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDTO { 
  @IsString()
  name?: string;

  @IsString()
  email?: string;

  @IsString()
  password?: string;
}