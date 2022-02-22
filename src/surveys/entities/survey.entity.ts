/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { Survey } from '@prisma/client';

export class SurveyEntity implements Survey {
    @ApiProperty()
    surveyid: number;
    @ApiProperty()
    title: string;
    @ApiProperty()
    creatorid: number;
    @ApiProperty()
    reporterid: number;
    @ApiProperty({ required: false, default: false })
    published: boolean = false;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
}
