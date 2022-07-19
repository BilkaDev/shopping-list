import {IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class CreateListDto {
    @MinLength(2)
    @MaxLength(100)
    @IsString()
    @IsNotEmpty()
    listName: string;

    @IsString()
    @IsNotEmpty()
    userId: string;
}