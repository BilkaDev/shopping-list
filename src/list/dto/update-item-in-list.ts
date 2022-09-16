import { ProductCategory } from "../../interfaces";
import { IsInt, IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class UpdateItemsListDto {
  @IsInt()
  @Min(0)
  @Max(1000)
  count: number;
  @IsInt()
  @Min(0)
  @Max(1000000)
  weight: number;

  @IsNumber()
  @IsNotEmpty()
  category: ProductCategory;
}
