import { Tag } from '@app/entities/tag';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class FollowDto {
  @IsNotEmpty()
  @IsString()
  followee_id: string;
}
