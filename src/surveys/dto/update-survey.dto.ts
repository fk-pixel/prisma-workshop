/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateSurveyDto } from './create-survey.dto';

export class UpdateSurveyDto extends PartialType(CreateSurveyDto) {}
