/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class UserEntity implements User {
    @ApiProperty()
    userId: number;
    
    @ApiProperty()
    username: string;
    
    @ApiProperty()
    email: string;
    
    @ApiProperty()
    password: string;
    
    @ApiProperty()
    image: string;
    
    @ApiProperty()
    createdAt: Date;
    
    @ApiProperty()
    surveys: any;
}