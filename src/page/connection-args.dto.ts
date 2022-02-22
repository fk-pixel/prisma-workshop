/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class ConnectionArgs {
    // 👇 use if enableImplicitConversion not enabled
    @Type(() => Number) // 👈 transform to type number
    @IsOptional()
    @IsNumber()
    @ApiProperty({ required: false })
    first?: number;
  
    @IsOptional()
    @IsNumber()
    @ApiProperty({ required: false })
    last?: number;
  
    @IsOptional()
    @IsNumber()
    @ApiProperty({ required: false })
    after?: string;
  
    @IsOptional()
    @IsNumber()
    @ApiProperty({ required: false })
    before?: string;
  }