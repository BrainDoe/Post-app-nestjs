import { IsNumber, IsString, IsNotEmpty , IsPositive, IsOptional, IsEmail } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class CreatePostDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  image: string;
}

export class UpdatePostDTO { 
  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsString()
  image?: string;
}