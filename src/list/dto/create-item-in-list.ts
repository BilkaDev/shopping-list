import {IsInt, IsNotEmpty, IsString, Max, Min} from "class-validator";

export class CreateItemInListDto {
    @IsString()
    @IsNotEmpty()
    listId?: string;
    @IsString()
    @IsNotEmpty()
    itemId: string;


    @IsInt()
    @Min(0)
    @Max(1000)
    count: number;

    @IsInt()
    @Min(0)
    @Max(1000000)
    weight: number;
}