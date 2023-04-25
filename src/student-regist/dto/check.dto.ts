import { IsString, MinLength } from "class-validator";

export class CheckDto {
    @IsString()
    @MinLength(10)
    companyName: string;

    @IsString()
    @MinLength(10)
    myNumber: string;
}