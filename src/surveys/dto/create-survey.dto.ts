/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
    MinLength,
  } from 'class-validator';

export class CreateSurveyDto {
    @IsNotEmpty()
    @MinLength(5)
    @IsString()
    @ApiProperty()
    title: string;
    
    @ApiProperty({ required: false, default: false })
    published: boolean = false;
    
    creator: any;
    
}
