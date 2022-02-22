/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { PrismaService } from './../prisma/prisma.service';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Prisma } from '@prisma/client';
import { ConnectionArgs } from 'src/page/connection-args.dto';

@Injectable()
export class SurveysService {
  constructor( private prisma: PrismaService ) {}

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

  async findPage(connectionArgs: ConnectionArgs) {
    const where: Prisma.SurveyWhereInput = {
      published: true,
    };
    return findManyCursorConnection(
      (args) =>
        this.prisma.survey.findMany({
          ...args[0], // 👈 apply paging arguments
          where: where,
        }),
      () => this.prisma.survey.count({
          where: where, // 👈 apply paging arguments
        }),
        connectionArgs, // 👈 use connection arguments
    );
  }
}