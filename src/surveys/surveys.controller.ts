/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { ApiTags } from '@nestjs/swagger';
import { SurveyEntity } from './entities/survey.entity';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('surveys')
@ApiTags('surveys')
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @Post()
  @ApiCreatedResponse({ type: [SurveyEntity] })
  create(@Body() createSurveyDto: CreateSurveyDto) {
    return this.surveysService.create(createSurveyDto);
  }

  @Get()
  @ApiOkResponse({ type: [SurveyEntity] })
  findAll() {
    return this.surveysService.findAll();
  }

  @Get('drafts')
  @ApiOkResponse({ type: [SurveyEntity] })
  findDrafts() {
    return this.surveysService.findDrafts();
  }

  @Get(':surveyid')
  @ApiOkResponse({ type: [SurveyEntity] })
  findOne(@Param('surveyid') surveyid: string) {
    return this.surveysService.findOne(+surveyid);
  }

  @Patch(':surveyid')
  @ApiCreatedResponse({ type: [SurveyEntity] })
  update(@Param('surveyid') surveyid: string, @Body() updateSurveyDto: UpdateSurveyDto) {
    return this.surveysService.update(+surveyid, updateSurveyDto);
  }

  @Delete(':surveyid')
  @ApiOkResponse({ type: [SurveyEntity] })
  remove(@Param('surveyid') surveyid: string) {
    return this.surveysService.remove(+surveyid);
  }


  
}
