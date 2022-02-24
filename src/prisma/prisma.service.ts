/* eslint-disable prettier/prettier */
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super();
    }

    async onModuleInit() {
        await this.$connect();
        this.$use(async (params, next) => {
            if (params.action == 'create' && params.model == 'User') {
               const user = params.args.data;
               const salt = bcrypt.genSaltSync(10);
               const hash = bcrypt.hashSync(user.password, salt);
               user.password = hash;
               params.args.data= user;     
            }
            return next(params);
        })
        
    }

    async onModuleDestroy() {
        await this.$disconnect();
      }
}
