import { Tag } from '@app/entities/tag';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
  IsOptional,
  IsUUID,
  IsNumber,
} from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  components: any[];

  @IsOptional()
  @IsArray()
  tags?: Tag[];

  @IsOptional()
  @IsNumber()
  readonly timeSpent?: number;
}
