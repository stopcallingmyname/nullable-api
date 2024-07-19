import {
  IsOptional,
  IsString,
  IsArray,
  ArrayMinSize,
  IsNotEmpty,
} from 'class-validator';

export class UpdateProjectDto {
  @IsNotEmpty()
  @IsString()
  preview_url: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  components?: any[];

  @IsOptional()
  @IsArray()
  tags?: string[];
}
