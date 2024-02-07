import { IsOptional, IsString, IsArray, ArrayMinSize } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  title?: string;

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
