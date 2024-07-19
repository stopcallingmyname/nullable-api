import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateUserPasswordDto {
  @Length(6, 128)
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
  @Length(6, 128)
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
