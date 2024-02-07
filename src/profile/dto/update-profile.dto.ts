import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  surname?: string;
  @IsString()
  @IsOptional()
  bio?: string;
  @IsUrl()
  @IsOptional()
  social_links?: string;
  @IsUrl()
  @IsOptional()
  portfolio_url?: string;
  @IsUrl()
  @IsOptional()
  avatar_url?: string;
}
