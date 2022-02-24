/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength, IsEmail, Matches, IsString } from "class-validator";
export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    @IsString()
    username: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;
    
    @ApiProperty()
    @IsString()
    image: string;
}