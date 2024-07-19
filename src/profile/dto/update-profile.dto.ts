import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  full_name?: string;
  @IsString()
  @IsOptional()
  location?: string;
  @IsString()
  @IsOptional()
  bio?: string;
  @IsUrl()
  @IsOptional()
  personal_website_url?: string;
  @IsUrl()
  @IsOptional()
  twitter_url?: string;
  @IsUrl()
  @IsOptional()
  facebook_url?: string;
  @IsUrl()
  @IsOptional()
  instagram_url?: string;
  @IsUrl()
  @IsOptional()
  github_url?: string;
  @IsUrl()
  @IsOptional()
  behance_url?: string;
  @IsUrl()
  @IsOptional()
  linkedIn_url?: string;
  @IsUrl()
  @IsOptional()
  vimeo_url?: string;
}
