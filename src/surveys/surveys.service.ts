/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class SurveysService {
  constructor(private prisma: PrismaService) {}

  //CRUD operations
  create(createSurveyDto: CreateSurveyDto) {
    return this.prisma.survey.create({ data: createSurveyDto });
  }

  findAll() {
    return this.prisma.survey.findMany({ where: { published: true } });
  }

  findOne(surveyid: number) {
    return this.prisma.survey.findUnique({ where: { surveyid: surveyid } });
  }

  update(surveyid: number, updateSurveyDto: UpdateSurveyDto) {
    return this.prisma.survey.update({
      where: { surveyid: surveyid },
      data: updateSurveyDto,
    });
  }

  remove(surveyid: number) {
    return this.prisma.survey.delete({ where: { surveyid: surveyid } });
  }

  findDrafts() {
    return this.prisma.survey.findMany({ where: { published: false } });
  }
}
