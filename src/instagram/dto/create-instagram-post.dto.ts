import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateInstagramPostDto {
  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;

  @IsOptional()
  @IsString()
  caption?: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
