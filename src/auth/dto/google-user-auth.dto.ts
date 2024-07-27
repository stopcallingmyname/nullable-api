import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleUserAuthDto {
  @IsNotEmpty()
  @IsString()
  clientId: string;

  @IsNotEmpty()
  @IsString()
  credential: string;
}
