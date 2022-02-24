/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { SurveyEntity } from './entities/survey.entity';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ConnectionArgs } from 'src/page/connection-args.dto';
import { ApiPageResponse } from 'src/page/api-page-response.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Page } from '../page/page.dto';

@Controller('surveys')
@ApiTags('surveys')
@ApiExtraModels(Page)
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @Post()
  @UseGuards(JwtAuthGuard) 
  @ApiBearerAuth()
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: [SurveyEntity] })
  findDrafts() {
    return this.surveysService.findDrafts();
  }

  @Get('page')
  @ApiPageResponse(SurveyEntity)
  async findPage(@Query() connectionArgs: ConnectionArgs) {
    return this.surveysService.findPage(connectionArgs);
  }

  @Get(':surveyid')
  @ApiOkResponse({ type: [SurveyEntity] })
  findOne(@Param('surveyid') surveyid: number) {
    return this.surveysService.findOne(+surveyid);
  }

  @Patch(':surveyid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: [SurveyEntity] })
  update(@Param('surveyid') surveyid: number, @Body() updateSurveyDto: UpdateSurveyDto) {
    return this.surveysService.update(+surveyid, updateSurveyDto);
  }

  @Delete(':surveyid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: [SurveyEntity] })
  remove(@Param('surveyid') surveyid: number) {
    return this.surveysService.remove(+surveyid);
  }
  
}
