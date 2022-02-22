/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Edge } from './edge.dto';
import { PageInfo } from './page-info.dto';

export class Page<Record> {
  edges: Edge<Record>[];

  @ApiProperty()
  pageInfo: PageInfo;
  
  @ApiProperty()
  totalCount: number;
}