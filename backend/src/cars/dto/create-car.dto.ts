import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  event_uuid: string;

  @IsString()
  @ApiProperty()
  description: string;
}
