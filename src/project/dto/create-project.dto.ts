import { Tag } from '@app/entity/tag';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
  IsOptional,
  IsUUID,
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

  @IsNotEmpty()
  @IsUUID()
  profileId: string;
}
