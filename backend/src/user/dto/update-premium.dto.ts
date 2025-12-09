import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePremiumDto {
  @ApiProperty({
    description: 'Premium faol yoki faol emas',
    example: true,
  })
  @IsBoolean()
  hasPremium: boolean;

  @ApiProperty({
    description: 'Premium davomiyligi kunlarda',
    example: 30,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  durationDays?: number;
}