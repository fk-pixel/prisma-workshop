/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    MinLength,
  } from 'class-validator';

export class CreateSurveyDto {
    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty()
    title: string;
    @ApiProperty({ required: false, default: false })
    published: boolean = false;
}
